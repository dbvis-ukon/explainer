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

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os
import os.path
import shutil

import tensorflow as tf

from tensorboard.backend.event_processing import event_accumulator
from tensorboard.backend.event_processing import event_multiplexer


def _AddEvents(path):
  if not tf.gfile.IsDirectory(path):
    tf.gfile.MakeDirs(path)
  fpath = os.path.join(path, 'hypothetical.tfevents.out')
  with tf.gfile.GFile(fpath, 'w') as f:
    f.write('')
    return fpath


def _CreateCleanDirectory(path):
  if tf.gfile.IsDirectory(path):
    tf.gfile.DeleteRecursively(path)
  tf.gfile.MkDir(path)


class _FakeAccumulator(object):

  def __init__(self, path):
    """Constructs a fake accumulator with some fake events.

    Args:
      path: The path for the run that this accumulator is for.
    """
    self._path = path
    self.reload_called = False
    self._plugin_to_tag_to_content = {
        'baz_plugin': {
            'foo': 'foo_content',
            'bar': 'bar_content',
        }
    }

  def Tags(self):
    return {event_accumulator.IMAGES: ['im1', 'im2'],
            event_accumulator.AUDIO: ['snd1', 'snd2'],
            event_accumulator.HISTOGRAMS: ['hst1', 'hst2'],
            event_accumulator.COMPRESSED_HISTOGRAMS: ['cmphst1', 'cmphst2'],
            event_accumulator.SCALARS: ['sv1', 'sv2']}

  def FirstEventTimestamp(self):
    return 0

  def _TagHelper(self, tag_name, enum):
    if tag_name not in self.Tags()[enum]:
      raise KeyError
    return ['%s/%s' % (self._path, tag_name)]

  def Scalars(self, tag_name):
    return self._TagHelper(tag_name, event_accumulator.SCALARS)

  def Histograms(self, tag_name):
    return self._TagHelper(tag_name, event_accumulator.HISTOGRAMS)

  def CompressedHistograms(self, tag_name):
    return self._TagHelper(tag_name, event_accumulator.COMPRESSED_HISTOGRAMS)

  def Images(self, tag_name):
    return self._TagHelper(tag_name, event_accumulator.IMAGES)

  def Audio(self, tag_name):
    return self._TagHelper(tag_name, event_accumulator.AUDIO)

  def Tensors(self, tag_name):
    return self._TagHelper(tag_name, event_accumulator.TENSORS)

  def PluginTagToContent(self, plugin_name):
    # We pre-pend the runs with the path and '_' so that we can verify that the
    # tags are associated with the correct runs.
    return {
        self._path + '_' + run: content_mapping
        for (run, content_mapping
            ) in self._plugin_to_tag_to_content[plugin_name].items()
    }

  def Reload(self):
    self.reload_called = True


def _GetFakeAccumulator(path,
                        size_guidance=None,
                        compression_bps=None,
                        purge_orphaned_data=None):
  del size_guidance, compression_bps, purge_orphaned_data  # Unused.
  return _FakeAccumulator(path)


class EventMultiplexerTest(tf.test.TestCase):

  def setUp(self):
    super(EventMultiplexerTest, self).setUp()
    self.stubs = tf.test.StubOutForTesting()

    self.stubs.Set(event_accumulator, 'EventAccumulator', _GetFakeAccumulator)

  def tearDown(self):
    self.stubs.CleanUp()

  def testEmptyLoader(self):
    """Tests empty EventMultiplexer creation."""
    x = event_multiplexer.EventMultiplexer()
    self.assertEqual(x.Runs(), {})

  def testRunNamesRespected(self):
    """Tests two EventAccumulators inserted/accessed in EventMultiplexer."""
    x = event_multiplexer.EventMultiplexer({'run1': 'path1', 'run2': 'path2'})
    self.assertItemsEqual(sorted(x.Runs().keys()), ['run1', 'run2'])
    self.assertEqual(x.GetAccumulator('run1')._path, 'path1')
    self.assertEqual(x.GetAccumulator('run2')._path, 'path2')

  def testReload(self):
    """EventAccumulators should Reload after EventMultiplexer call it."""
    x = event_multiplexer.EventMultiplexer({'run1': 'path1', 'run2': 'path2'})
    self.assertFalse(x.GetAccumulator('run1').reload_called)
    self.assertFalse(x.GetAccumulator('run2').reload_called)
    x.Reload()
    self.assertTrue(x.GetAccumulator('run1').reload_called)
    self.assertTrue(x.GetAccumulator('run2').reload_called)

  def testScalars(self):
    """Tests Scalars function returns suitable values."""
    x = event_multiplexer.EventMultiplexer({'run1': 'path1', 'run2': 'path2'})

    run1_actual = x.Scalars('run1', 'sv1')
    run1_expected = ['path1/sv1']

    self.assertEqual(run1_expected, run1_actual)

  def testPluginRunToTagToContent(self):
    """Tests the method that produces the run to tag to content mapping."""
    x = event_multiplexer.EventMultiplexer({'run1': 'path1', 'run2': 'path2'})
    self.assertDictEqual({
        'run1': {
            'path1_foo': 'foo_content',
            'path1_bar': 'bar_content',
        },
        'run2': {
            'path2_foo': 'foo_content',
            'path2_bar': 'bar_content',
        }
    }, x.PluginRunToTagToContent('baz_plugin'))

  def testExceptions(self):
    """KeyError should be raised when accessing non-existing keys."""
    x = event_multiplexer.EventMultiplexer({'run1': 'path1', 'run2': 'path2'})
    with self.assertRaises(KeyError):
      x.Scalars('sv1', 'xxx')

  def testInitialization(self):
    """Tests EventMultiplexer is created properly with its params."""
    x = event_multiplexer.EventMultiplexer()
    self.assertEqual(x.Runs(), {})
    x = event_multiplexer.EventMultiplexer({'run1': 'path1', 'run2': 'path2'})
    self.assertItemsEqual(x.Runs(), ['run1', 'run2'])
    self.assertEqual(x.GetAccumulator('run1')._path, 'path1')
    self.assertEqual(x.GetAccumulator('run2')._path, 'path2')

  def testAddRunsFromDirectory(self):
    """Tests AddRunsFromDirectory function.

    Tests the following scenarios:
    - When the directory does not exist.
    - When the directory is empty.
    - When the directory has empty subdirectory.
    - Contains proper EventAccumulators after adding events.
    """
    x = event_multiplexer.EventMultiplexer()
    tmpdir = self.get_temp_dir()
    join = os.path.join
    fakedir = join(tmpdir, 'fake_accumulator_directory')
    realdir = join(tmpdir, 'real_accumulator_directory')
    self.assertEqual(x.Runs(), {})
    x.AddRunsFromDirectory(fakedir)
    self.assertEqual(x.Runs(), {}, 'loading fakedir had no effect')

    _CreateCleanDirectory(realdir)
    x.AddRunsFromDirectory(realdir)
    self.assertEqual(x.Runs(), {}, 'loading empty directory had no effect')

    path1 = join(realdir, 'path1')
    tf.gfile.MkDir(path1)
    x.AddRunsFromDirectory(realdir)
    self.assertEqual(x.Runs(), {}, 'creating empty subdirectory had no effect')

    _AddEvents(path1)
    x.AddRunsFromDirectory(realdir)
    self.assertItemsEqual(x.Runs(), ['path1'], 'loaded run: path1')
    loader1 = x.GetAccumulator('path1')
    self.assertEqual(loader1._path, path1, 'has the correct path')

    path2 = join(realdir, 'path2')
    _AddEvents(path2)
    x.AddRunsFromDirectory(realdir)
    self.assertItemsEqual(x.Runs(), ['path1', 'path2'])
    self.assertEqual(
        x.GetAccumulator('path1'), loader1, 'loader1 not regenerated')

    path2_2 = join(path2, 'path2')
    _AddEvents(path2_2)
    x.AddRunsFromDirectory(realdir)
    self.assertItemsEqual(x.Runs(), ['path1', 'path2', 'path2/path2'])
    self.assertEqual(
        x.GetAccumulator('path2/path2')._path, path2_2, 'loader2 path correct')

  def testAddRunsFromDirectoryThatContainsEvents(self):
    x = event_multiplexer.EventMultiplexer()
    tmpdir = self.get_temp_dir()
    join = os.path.join
    realdir = join(tmpdir, 'event_containing_directory')

    _CreateCleanDirectory(realdir)

    self.assertEqual(x.Runs(), {})

    _AddEvents(realdir)
    x.AddRunsFromDirectory(realdir)
    self.assertItemsEqual(x.Runs(), ['.'])

    subdir = join(realdir, 'subdir')
    _AddEvents(subdir)
    x.AddRunsFromDirectory(realdir)
    self.assertItemsEqual(x.Runs(), ['.', 'subdir'])

  def testAddRunsFromDirectoryWithRunNames(self):
    x = event_multiplexer.EventMultiplexer()
    tmpdir = self.get_temp_dir()
    join = os.path.join
    realdir = join(tmpdir, 'event_containing_directory')

    _CreateCleanDirectory(realdir)

    self.assertEqual(x.Runs(), {})

    _AddEvents(realdir)
    x.AddRunsFromDirectory(realdir, 'foo')
    self.assertItemsEqual(x.Runs(), ['foo/.'])

    subdir = join(realdir, 'subdir')
    _AddEvents(subdir)
    x.AddRunsFromDirectory(realdir, 'foo')
    self.assertItemsEqual(x.Runs(), ['foo/.', 'foo/subdir'])

  def testAddRunsFromDirectoryWalksTree(self):
    x = event_multiplexer.EventMultiplexer()
    tmpdir = self.get_temp_dir()
    join = os.path.join
    realdir = join(tmpdir, 'event_containing_directory')

    _CreateCleanDirectory(realdir)
    _AddEvents(realdir)
    sub = join(realdir, 'subdirectory')
    sub1 = join(sub, '1')
    sub2 = join(sub, '2')
    sub1_1 = join(sub1, '1')
    _AddEvents(sub1)
    _AddEvents(sub2)
    _AddEvents(sub1_1)
    x.AddRunsFromDirectory(realdir)

    self.assertItemsEqual(x.Runs(), ['.', 'subdirectory/1', 'subdirectory/2',
                                     'subdirectory/1/1'])

  def testAddRunsFromDirectoryThrowsException(self):
    x = event_multiplexer.EventMultiplexer()
    tmpdir = self.get_temp_dir()

    filepath = _AddEvents(tmpdir)
    with self.assertRaises(ValueError):
      x.AddRunsFromDirectory(filepath)

  def testAddRun(self):
    x = event_multiplexer.EventMultiplexer()
    x.AddRun('run1_path', 'run1')
    run1 = x.GetAccumulator('run1')
    self.assertEqual(sorted(x.Runs().keys()), ['run1'])
    self.assertEqual(run1._path, 'run1_path')

    x.AddRun('run1_path', 'run1')
    self.assertEqual(run1, x.GetAccumulator('run1'), 'loader not recreated')

    x.AddRun('run2_path', 'run1')
    new_run1 = x.GetAccumulator('run1')
    self.assertEqual(new_run1._path, 'run2_path')
    self.assertNotEqual(run1, new_run1)

    x.AddRun('runName3')
    self.assertItemsEqual(sorted(x.Runs().keys()), ['run1', 'runName3'])
    self.assertEqual(x.GetAccumulator('runName3')._path, 'runName3')

  def testAddRunMaintainsLoading(self):
    x = event_multiplexer.EventMultiplexer()
    x.Reload()
    x.AddRun('run1')
    x.AddRun('run2')
    self.assertTrue(x.GetAccumulator('run1').reload_called)
    self.assertTrue(x.GetAccumulator('run2').reload_called)


class EventMultiplexerWithRealAccumulatorTest(tf.test.TestCase):

  def testDeletingDirectoryRemovesRun(self):
    x = event_multiplexer.EventMultiplexer()
    tmpdir = self.get_temp_dir()
    join = os.path.join
    run1_dir = join(tmpdir, 'run1')
    run2_dir = join(tmpdir, 'run2')
    run3_dir = join(tmpdir, 'run3')

    for dirname in [run1_dir, run2_dir, run3_dir]:
      _AddEvents(dirname)

    x.AddRun(run1_dir, 'run1')
    x.AddRun(run2_dir, 'run2')
    x.AddRun(run3_dir, 'run3')

    x.Reload()

    # Delete the directory, then reload.
    shutil.rmtree(run2_dir)
    x.Reload()
    self.assertNotIn('run2', x.Runs().keys())


if __name__ == '__main__':
  tf.test.main()
