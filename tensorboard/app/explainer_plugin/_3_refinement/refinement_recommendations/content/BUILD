package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "recommendation_contents",
    srcs = [
        "architectures.ts",
        "common.ts",
        "recommendation-contents.html",
    ],
    path = "/refinement",
    deps = [
        "//explainer_plugin/common:jquery",
        "//explainer_plugin/common:mathjs",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:lodash",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)
