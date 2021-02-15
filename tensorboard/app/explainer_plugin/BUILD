package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:defs.bzl", "tensorboard_webcomponent_library")
load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")
load("//third_party:js-lib.bzl", "explainer_js_lib_workspace")

licenses(["notice"])  # Apache 2.0

py_library(
    name = "explainer_plugin",
    srcs = ["explainer_plugin.py"],
    srcs_version = "PY2AND3",
    deps = [
        "@org_pocoo_werkzeug",
        "@org_pythonhosted_six",
        "@org_tensorflow_tensorboard//tensorboard/backend:http_util",
        "@org_tensorflow_tensorboard//tensorboard/backend/event_processing:event_accumulator",
        "@org_tensorflow_tensorboard//tensorboard/plugins:base_plugin",
    ],
)

py_binary(
    name = "explainer_demo",
    srcs = ["explainer_demo.py"],
    srcs_version = "PY2AND3",
    deps = [":explainer_summary"],
)

py_binary(
    name = "explainer_demo_simple",
    srcs = ["explainer_demo_simple.py"],
    srcs_version = "PY2AND3",
    deps = [":explainer_summary"],
)

py_library(
    name = "explainer_summary",
    srcs = ["explainer_summary.py"],
    srcs_version = "PY2AND3",
)
