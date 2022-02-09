# Copyright 2017 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the 'License');
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# TensorBoard external dependencies that are used on the python side.
# Protobuf and six were deliberately left in the top-level workspace, as they
# are used in TensorFlow as well.

def tensorboard_python_workspace():
  native.new_http_archive(
      name = "org_pythonhosted_markdown",
      urls = [
          "https://mirror.bazel.build/pypi.python.org/packages/1d/25/3f6d2cb31ec42ca5bd3bfbea99b63892b735d76e26f20dd2dcc34ffe4f0d/Markdown-2.6.8.tar.gz",
          "https://pypi.python.org/packages/1d/25/3f6d2cb31ec42ca5bd3bfbea99b63892b735d76e26f20dd2dcc34ffe4f0d/Markdown-2.6.8.tar.gz",
      ],
      strip_prefix = "Markdown-2.6.8",
      sha256 = "0ac8a81e658167da95d063a9279c9c1b2699f37c7c4153256a458b3a43860e33",
      build_file = str(Label("//third_party:markdown.BUILD")),
  )

  native.new_http_archive(
      name = "org_html5lib",
      urls = [
          "https://mirror.bazel.build/github.com/html5lib/html5lib-python/archive/0.9999999.tar.gz",
          "https://github.com/html5lib/html5lib-python/archive/0.9999999.tar.gz",  # identical to 1.0b8
      ],
      sha256 = "184257f98539159a433e2a2197309657ae1283b4c44dbd9c87b2f02ff36adce8",
      strip_prefix = "html5lib-python-0.9999999",
      build_file = str(Label("//third_party:html5lib.BUILD")),
  )

  native.new_http_archive(
      name = "org_mozilla_bleach",
      urls = [
          "https://mirror.bazel.build/github.com/mozilla/bleach/archive/v1.5.tar.gz",
          "https://github.com/mozilla/bleach/archive/v1.5.tar.gz",
      ],
      strip_prefix = "bleach-1.5",
      sha256 = "0d68713d02ba4148c417ab1637dd819333d96929a34401d0233947bec0881ad8",
      build_file = str(Label("//third_party:bleach.BUILD")),
  )

  native.new_http_archive(
      name = "org_pocoo_werkzeug",
      urls = [
          "https://mirror.bazel.build/pypi.python.org/packages/b7/7f/44d3cfe5a12ba002b253f6985a4477edfa66da53787a2a838a40f6415263/Werkzeug-0.11.10.tar.gz",
          "https://pypi.python.org/packages/b7/7f/44d3cfe5a12ba002b253f6985a4477edfa66da53787a2a838a40f6415263/Werkzeug-0.11.10.tar.gz",
      ],
      strip_prefix = "Werkzeug-0.11.10",
      sha256 = "cc64dafbacc716cdd42503cf6c44cb5a35576443d82f29f6829e5c49264aeeee",
      build_file = str(Label("//third_party:werkzeug.BUILD")),
  )

  native.new_http_archive(
      name = "org_pythonhosted_six",
      urls = [
          "https://mirror.bazel.build/pypi.python.org/packages/source/s/six/six-1.10.0.tar.gz",
          "http://pypi.python.org/packages/source/s/six/six-1.10.0.tar.gz",
      ],
      sha256 = "105f8d68616f8248e24bf0e9372ef04d3cc10104f1980f54d57b2ce73a5ad56a",
      strip_prefix = "six-1.10.0",
      build_file = str(Label("//third_party:six.BUILD")),
  )

  native.new_http_archive(
      name = "org_python_pypi_portpicker",
      urls = [
          "https://mirror.bazel.build/pypi.python.org/packages/96/48/0e1f20fdc0b85cc8722284da3c5b80222ae4036ad73210a97d5362beaa6d/portpicker-1.1.1.tar.gz",
          "https://pypi.python.org/packages/96/48/0e1f20fdc0b85cc8722284da3c5b80222ae4036ad73210a97d5362beaa6d/portpicker-1.1.1.tar.gz",
      ],
      sha256 = "2f88edf7c6406034d7577846f224aff6e53c5f4250e3294b1904d8db250f27ec",
      strip_prefix = "portpicker-1.1.1/src",
      build_file = str(Label("//third_party:portpicker.BUILD")),
  )

  native.new_http_archive(
      name = "org_tensorflow_serving_api",
      urls = [
          "https://mirror.bazel.build/files.pythonhosted.org/packages/b5/da/bd60d7b245dbe93f35aded752679124a61bb90154d4698f6f3dba30d75c6/tensorflow_serving_api-1.10.1-py2.py3-none-any.whl",
          "https://files.pythonhosted.org/packages/b5/da/bd60d7b245dbe93f35aded752679124a61bb90154d4698f6f3dba30d75c6/tensorflow_serving_api-1.10.1-py2.py3-none-any.whl",
      ],
      type = "zip",
      sha256 = "77bc67484c3d7ce58de24b68b9f4ba26f9f7c459361a257e970350105cae4838",
      build_file = str(Label("//third_party:tf_serving.BUILD")),
  )
