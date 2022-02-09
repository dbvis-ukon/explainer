# Copyright 2015 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""IO helper functions."""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import collections
import os
import re

import six
import tensorflow as tf

_ESCAPE_GLOB_CHARACTERS_REGEX = re.compile('([*?[])')


# TODO(chihuahua): Rename this method to use camel-case for GCS (Gcs).
def IsGCSPath(path):
  return path.startswith("gs://")


def IsCnsPath(path):
  return path.startswith("/cns/")


def IsTensorFlowEventsFile(path):
  """Check the path name to see if it is probably a TF Events file.

  Args:
    path: A file path to check if it is an event file.

  Raises:
    ValueError: If the path is an empty string.

  Returns:
    If path is formatted like a TensorFlowEventsFile.
  """
  if not path:
    raise ValueError('Path must be a nonempty string')
  return 'tfevents' in tf.compat.as_str_any(os.path.basename(path))


def ListDirectoryAbsolute(directory):
  """Yields all files in the given directory. The paths are absolute."""
  return (os.path.join(directory, path)
          for path in tf.gfile.ListDirectory(directory))


def _EscapeGlobCharacters(path):
  """Escapes the glob characters in a path.

  Python 3 has a glob.escape method, but python 2 lacks it, so we manually
  implement this method.

  Args:
    path: The absolute path to escape.

  Returns:
    The escaped path string.
  """
  drive, path = os.path.splitdrive(path)
  return '%s%s' % (drive, _ESCAPE_GLOB_CHARACTERS_REGEX.sub(r'[\1]', path))


def ListRecursivelyViaGlobbing(top):
  """Recursively lists all files within the directory.

  This method does not list subdirectories (in addition to regular files), and
  the file paths are all absolute. If the directory does not exist, this yields
  nothing.

  This method does so by glob-ing deeper and deeper directories, ie
  foo/*, foo/*/*, foo/*/*/* and so on until all files are listed. All file
  paths are absolute, and this method lists subdirectories too.

  For certain file systems, globbing via this method may prove significantly
  faster than recursively walking a directory. Specifically, TF file systems
  that implement TensorFlow's FileSystem.GetMatchingPaths method could save
  costly disk reads by using this method. However, for other file systems, this
  method might prove slower because the file system performs a walk per call to
  glob (in which case it might as well just perform 1 walk).

  Args:
    top: A path to a directory.

  Yields:
    A (dir_path, file_paths) tuple for each directory/subdirectory.
  """
  current_glob_string = os.path.join(_EscapeGlobCharacters(top), '*')
  level = 0

  while True:
    tf.logging.info('GlobAndListFiles: Starting to glob level %d', level)
    glob = tf.gfile.Glob(current_glob_string)
    tf.logging.info(
        'GlobAndListFiles: %d files glob-ed at level %d', len(glob), level)

    if not glob:
      # This subdirectory level lacks files. Terminate.
      return

    # Map subdirectory to a list of files.
    pairs = collections.defaultdict(list)
    for file_path in glob:
      pairs[os.path.dirname(file_path)].append(file_path)
    for dir_name, file_paths in six.iteritems(pairs):
      yield (dir_name, tuple(file_paths))

    if len(pairs) == 1:
      # If at any point the glob returns files that are all in a single
      # directory, replace the current globbing path with that directory as the
      # literal prefix. This should improve efficiency in cases where a single
      # subdir is significantly deeper than the rest of the sudirs.
      current_glob_string = os.path.join(list(pairs.keys())[0], '*')

    # Iterate to the next level of subdirectories.
    current_glob_string = os.path.join(current_glob_string, '*')
    level += 1


def ListRecursivelyViaWalking(top):
  """Walks a directory tree, yielding (dir_path, file_paths) tuples.

  For each of `top` and its subdirectories, yields a tuple containing the path
  to the directory and the path to each of the contained files.  Note that
  unlike os.Walk()/tf.gfile.Walk()/ListRecursivelyViaGlobbing, this does not
  list subdirectories. The file paths are all absolute. If the directory does
  not exist, this yields nothing.

  Walking may be incredibly slow on certain file systems.

  Args:
    top: A path to a directory.

  Yields:
    A (dir_path, file_paths) tuple for each directory/subdirectory.
  """
  for dir_path, _, filenames in tf.gfile.Walk(top):
    yield (dir_path, (os.path.join(dir_path, filename)
                      for filename in filenames))


def GetLogdirSubdirectories(path):
  """Obtains all subdirectories with events files.

  The order of the subdirectories returned is unspecified. The internal logic
  that determines order varies by scenario.

  Args:
    path: The path to a directory under which to find subdirectories.

  Returns:
    A tuple of absolute paths of all subdirectories each with at least 1 events
    file directly within the subdirectory.

  Raises:
    ValueError: If the path passed to the method exists and is not a directory.
  """
  if not tf.gfile.Exists(path):
    # No directory to traverse.
    return ()

  if not tf.gfile.IsDirectory(path):
    raise ValueError('GetLogdirSubdirectories: path exists and is not a '
                     'directory, %s' % path)

  if IsGCSPath(path) or IsCnsPath(path):
    # Glob-ing for files can be significantly faster than recursively
    # walking through directories for some file systems.
    tf.logging.info(
        'GetLogdirSubdirectories: Starting to list directories via glob-ing.')
    traversal_method = ListRecursivelyViaGlobbing
  else:
    # For other file systems, the glob-ing based method might be slower because
    # each call to glob could involve performing a recursive walk.
    tf.logging.info(
        'GetLogdirSubdirectories: Starting to list directories via walking.')
    traversal_method = ListRecursivelyViaWalking

  return (
      subdir
      for (subdir, files) in traversal_method(path)
      if any(IsTensorFlowEventsFile(f) for f in files)
  )
