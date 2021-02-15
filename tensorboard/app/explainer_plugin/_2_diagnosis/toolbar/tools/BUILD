package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "tools",
    srcs = [
        "backend.ts",
        "backend-explanations.ts",
        "common.ts",
        "tools.html",
        "weight-explanations.ts",
        "weights.ts",
    ],
    path = "/diagnosis-toolbar",
    deps = [
        "//explainer_plugin/common:jquery",
        "//explainer_plugin/common:mathjs",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:lodash",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

#tensorboard_webcomponent_library(
#    name = "legacy",
#    srcs = [":tf_graph_common"],
#    destdir = "tf-diagnosis-graph-common",
#    deps = [
#        "//third_party/javascript/polymer/v1/polymer:lib",
#        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports_google:lib",
#    ],
#)
