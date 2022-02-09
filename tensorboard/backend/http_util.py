# Copyright 2016 The TensorFlow Authors. All Rights Reserved.
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
"""TensorBoard HTTP utilities."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import gzip
import json
import re
import struct
import time
import wsgiref.handlers

import six
import tensorflow as tf
import werkzeug

from tensorboard.backend import json_util


_EXTRACT_MIMETYPE_PATTERN = re.compile(r'^[^;\s]*')
_EXTRACT_CHARSET_PATTERN = re.compile(r'charset=([-_0-9A-Za-z]+)')

# Allows *, gzip or x-gzip, but forbid gzip;q=0
# https://tools.ietf.org/html/rfc7231#section-5.3.4
_ALLOWS_GZIP_PATTERN = re.compile(
    r'(?:^|,|\s)(?:(?:x-)?gzip|\*)(?!;q=0)(?:\s|,|$)')

_TEXTUAL_MIMETYPES = set([
    'application/javascript',
    'application/json',
    'application/json+protobuf',
    'image/svg+xml',
    'text/css',
    'text/csv',
    'text/html',
    'text/plain',
    'text/tab-separated-values',
    'text/x-protobuf',
])

_JSON_MIMETYPES = set([
    'application/json',
    'application/json+protobuf',
])


def Respond(request,
            content,
            content_type,
            code=200,
            expires=0,
            content_encoding=None,
            encoding='utf-8'):
  """Construct a werkzeug Response.

  Responses are transmitted to the browser with compression if: a) the browser
  supports it; b) it's sane to compress the content_type in question; and c)
  the content isn't already compressed, as indicated by the content_encoding
  parameter.

  Browser and proxy caching is completely disabled by default. If the expires
  parameter is greater than zero then the response will be able to be cached by
  the browser for that many seconds; however, proxies are still forbidden from
  caching so that developers can bypass the cache with Ctrl+Shift+R.

  For textual content that isn't JSON, the encoding parameter is used as the
  transmission charset which is automatically appended to the Content-Type
  header. That is unless of course the content_type parameter contains a
  charset parameter. If the two disagree, the characters in content will be
  transcoded to the latter.

  If content_type declares a JSON media type, then content MAY be a dict, list,
  tuple, or set, in which case this function has an implicit composition with
  json_util.Cleanse and json.dumps. The encoding parameter is used to decode
  byte strings within the JSON object; therefore transmitting binary data
  within JSON is not permitted. JSON is transmitted as ASCII unless the
  content_type parameter explicitly defines a charset parameter, in which case
  the serialized JSON bytes will use that instead of escape sequences.

  Args:
    request: A werkzeug Request object. Used mostly to check the
      Accept-Encoding header.
    content: Payload data as byte string, unicode string, or maybe JSON.
    content_type: Media type and optionally an output charset.
    code: Numeric HTTP status code to use.
    expires: Second duration for browser caching.
    content_encoding: Encoding if content is already encoded, e.g. 'gzip'.
    encoding: Input charset if content parameter has byte strings.

  Returns:
    A werkzeug Response object (a WSGI application).
  """

  mimetype = _EXTRACT_MIMETYPE_PATTERN.search(content_type).group(0)
  charset_match = _EXTRACT_CHARSET_PATTERN.search(content_type)
  charset = charset_match.group(1) if charset_match else encoding
  textual = charset_match or mimetype in _TEXTUAL_MIMETYPES
  if (mimetype in _JSON_MIMETYPES and
      isinstance(content, (dict, list, set, tuple))):
    content = json.dumps(json_util.Cleanse(content, encoding),
                         ensure_ascii=not charset_match)
  if charset != encoding:
    content = tf.compat.as_text(content, encoding)
  content = tf.compat.as_bytes(content, charset)
  if textual and not charset_match and mimetype not in _JSON_MIMETYPES:
    content_type += '; charset=' + charset
  gzip_accepted = _ALLOWS_GZIP_PATTERN.search(
      request.headers.get('Accept-Encoding', ''))
  # Automatically gzip uncompressed text data if accepted.
  if textual and not content_encoding and gzip_accepted:
    out = six.BytesIO()
    # Set mtime to zero to make payload for a given input deterministic.
    with gzip.GzipFile(fileobj=out, mode='wb', compresslevel=3, mtime=0) as f:
      f.write(content)
    content = out.getvalue()
    content_encoding = 'gzip'

  content_length = len(content)
  direct_passthrough = False
  # Automatically streamwise-gunzip precompressed data if not accepted.
  if content_encoding == 'gzip' and not gzip_accepted:
    gzip_file = gzip.GzipFile(fileobj=six.BytesIO(content), mode='rb')
    # Last 4 bytes of gzip formatted data (little-endian) store the original
    # content length mod 2^32; we just assume it's the content length. That
    # means we can't streamwise-gunzip >4 GB precompressed file; this is ok.
    content_length = struct.unpack('<I', content[-4:])[0]
    content = werkzeug.wsgi.wrap_file(request.environ, gzip_file)
    content_encoding = None
    direct_passthrough = True

  headers = []
  headers.append(('Content-Length', str(content_length)))
  if content_encoding:
    headers.append(('Content-Encoding', content_encoding))
  if expires > 0:
    e = wsgiref.handlers.format_date_time(time.time() + float(expires))
    headers.append(('Expires', e))
    headers.append(('Cache-Control', 'private, max-age=%d' % expires))
  else:
    headers.append(('Expires', '0'))
    headers.append(('Cache-Control', 'no-cache, must-revalidate'))

  if request.method == 'HEAD':
    content = None

  return werkzeug.wrappers.Response(
      response=content, status=code, headers=headers, content_type=content_type,
      direct_passthrough=direct_passthrough)
