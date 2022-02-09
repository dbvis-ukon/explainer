# Copyright 2017 The TensorFlow Authors. All Rights Reserved.
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
"""The TensorBoard Custom Scalars plugin.

This plugin lets the user create scalars plots with custom run-tag combinations
by specifying regular expressions.

See `http_api.md` in this directory for specifications of the routes for
this plugin.
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import re

from google.protobuf import json_format
import numpy as np
import tensorflow as tf
from werkzeug import wrappers

from tensorboard.backend import http_util
from tensorboard.plugins import base_plugin
from tensorboard.plugins.custom_scalar import layout_pb2
from tensorboard.plugins.custom_scalar import metadata
from tensorboard.plugins.scalar import metadata as scalars_metadata
from tensorboard.plugins.scalar import scalars_plugin

# The name of the property in the response for whether the regex is valid.
_REGEX_VALID_PROPERTY = 'regex_valid'

# The name of the property in the response for the payload (tag to ScalarEvents
# mapping).
_TAG_TO_EVENTS_PROPERTY = 'tag_to_events'

# The number of seconds to wait in between checks for the config file specifying
# layout.
_CONFIG_FILE_CHECK_THROTTLE = 60


class CustomScalarsPlugin(base_plugin.TBPlugin):
  """CustomScalars Plugin for TensorBoard."""

  plugin_name = metadata.PLUGIN_NAME

  def __init__(self, context):
    """Instantiates ScalarsPlugin via TensorBoard core.

    Args:
      context: A base_plugin.TBContext instance.
    """
    self._logdir = context.logdir
    self._multiplexer = context.multiplexer
    self._plugin_name_to_instance = context.plugin_name_to_instance

  def _get_scalars_plugin(self):
    """Tries to get the scalars plugin.

    Returns:
      The scalars plugin. Or None if it is not yet registered.
    """
    if scalars_metadata.PLUGIN_NAME in self._plugin_name_to_instance:
      # The plugin is registered.
      return self._plugin_name_to_instance[scalars_metadata.PLUGIN_NAME]
    # The plugin is not yet registered.
    return None

  def get_plugin_apps(self):
    return {
        '/download_data': self.download_data_route,
        '/layout': self.layout_route,
        '/scalars': self.scalars_route,
    }

  def is_active(self):
    """This plugin is active if 2 conditions hold.

    1. The scalars plugin is registered and active.
    2. There is a custom layout for the dashboard.

    Returns: A boolean. Whether the plugin is active.
    """
    if not self._multiplexer:
      return False

    scalars_plugin_instance = self._get_scalars_plugin()
    if not (scalars_plugin_instance and
            scalars_plugin_instance.is_active()):
      return False

    # This plugin is active if any run has a layout.
    return bool(self._multiplexer.PluginRunToTagToContent(metadata.PLUGIN_NAME))

  @wrappers.Request.application
  def download_data_route(self, request):
    run = request.args.get('run')
    tag = request.args.get('tag')
    response_format = request.args.get('format')
    try:
      body, mime_type = self.download_data_impl(run, tag, response_format)
    except ValueError as e:
      return http_util.Respond(
          request=request,
          content=str(e),
          content_type='text/plain',
          code=500)
    return http_util.Respond(request, body, mime_type)

  def download_data_impl(self, run, tag, response_format):
    """Provides a response for downloading scalars data for a data series.

    Args:
      run: The run.
      tag: The specific tag.
      response_format: A string. One of the values of the OutputFormat enum of
        the scalar plugin.

    Raises:
      ValueError: If the scalars plugin is not registered.

    Returns:
      2 entities:
        - A JSON object response body.
        - A mime type (string) for the response.
    """
    scalars_plugin_instance = self._get_scalars_plugin()
    if not scalars_plugin_instance:
      raise ValueError(('Failed to respond to request for /download_data. '
                        'The scalars plugin is oddly not registered.'))

    body, mime_type = scalars_plugin_instance.scalars_impl(
        tag, run, None, response_format)
    return body, mime_type

  @wrappers.Request.application
  def scalars_route(self, request):
    """Given a tag regex and single run, return ScalarEvents.

    This route takes 2 GET params:
    run: A run string to find tags for.
    tag: A string that is a regex used to find matching tags.
    The response is a JSON object:
    {
      // Whether the regular expression is valid. Also false if empty.
      regexValid: boolean,

      // An object mapping tag name to a list of ScalarEvents.
      payload: Object<string, ScalarEvent[]>,
    }
    """
    # TODO: return HTTP status code for malformed requests
    tag_regex_string = request.args.get('tag')
    run = request.args.get('run')
    mime_type = 'application/json'

    try:
      body = self.scalars_impl(run, tag_regex_string)
    except ValueError as e:
      return http_util.Respond(
          request=request,
          content=str(e),
          content_type='text/plain',
          code=500)

    # Produce the response.
    return http_util.Respond(request, body, mime_type)

  def scalars_impl(self, run, tag_regex_string):
    """Given a tag regex and single run, return ScalarEvents.

    Args:
      run: A run string.
      tag_regex_string: A regular expression that captures portions of tags.

    Raises:
      ValueError: if the scalars plugin is not registered.

    Returns:
      A dictionary that is the JSON-able response.
    """
    if not tag_regex_string:
      # The user provided no regex.
      return {
          _REGEX_VALID_PROPERTY: False,
          _TAG_TO_EVENTS_PROPERTY: {},
      }

    # Construct the regex.
    try:
      regex = re.compile(tag_regex_string)
    except re.error:
      return {
          _REGEX_VALID_PROPERTY: False,
          _TAG_TO_EVENTS_PROPERTY: {},
      }

    # Fetch the tags for the run. Filter for tags that match the regex.
    run_to_data = self._multiplexer.PluginRunToTagToContent(
        scalars_metadata.PLUGIN_NAME)

    tag_to_data = None
    try:
      tag_to_data = run_to_data[run]
    except KeyError:
      # The run could not be found. Perhaps a configuration specified a run that
      # TensorBoard has not read from disk yet.
      payload = {}

    if tag_to_data:
      scalars_plugin_instance = self._get_scalars_plugin()
      if not scalars_plugin_instance:
        raise ValueError(('Failed to respond to request for /scalars. '
                          'The scalars plugin is oddly not registered.'))

      form = scalars_plugin.OutputFormat.JSON
      payload = {
        tag: scalars_plugin_instance.scalars_impl(tag, run, None, form)[0]
            for tag in tag_to_data.keys()
            if regex.match(tag)
      }

    return {
        _REGEX_VALID_PROPERTY: True,
        _TAG_TO_EVENTS_PROPERTY: payload,
    }

  @wrappers.Request.application
  def layout_route(self, request):
    r"""Fetches the custom layout specified by the config file in the logdir.

    If more than 1 run contains a layout, this method merges the layouts by
    merging charts within individual categories. If 2 categories with the same
    name are found, the charts within are merged. The merging is based on the
    order of the runs to which the layouts are written.

    The response is a JSON object mirroring properties of the Layout proto if a
    layout for any run is found.

    The response is an empty object if no layout could be found.
    """
    body = self.layout_impl()
    return http_util.Respond(request, body, 'application/json')

  def layout_impl(self):
    # Keep a mapping between and category so we do not create duplicate
    # categories.
    title_to_category = {}

    merged_layout = None
    runs = list(self._multiplexer.PluginRunToTagToContent(metadata.PLUGIN_NAME))
    runs.sort()
    for run in runs:
      tensor_events = self._multiplexer.Tensors(
          run, metadata.CONFIG_SUMMARY_TAG)

      # This run has a layout. Merge it with the ones currently found.
      string_array = tf.make_ndarray(tensor_events[0].tensor_proto)
      content = np.asscalar(string_array)
      layout_proto = layout_pb2.Layout()
      layout_proto.ParseFromString(tf.compat.as_bytes(content))

      if merged_layout:
        # Append the categories within this layout to the merged layout.
        for category in layout_proto.category:
          if category.title in title_to_category:
            # A category with this name has been seen before. Do not create a
            # new one. Merge their charts, skipping any duplicates.
            title_to_category[category.title].chart.extend([
                c for c in category.chart
                if c not in title_to_category[category.title].chart
            ])
          else:
            # This category has not been seen before.
            merged_layout.category.add().MergeFrom(category)
            title_to_category[category.title] = category
      else:
        # This is the first layout encountered.
        merged_layout = layout_proto
        for category in layout_proto.category:
          title_to_category[category.title] = category

    if merged_layout:
      return json_format.MessageToJson(
          merged_layout, including_default_value_fields=True)
    else:
      # No layout was found.
      return {}
