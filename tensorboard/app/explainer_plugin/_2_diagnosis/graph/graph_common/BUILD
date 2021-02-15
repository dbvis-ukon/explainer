package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:defs.bzl", "tensorboard_webcomponent_library")
load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "graph_common",
    srcs = [
        "annotation.ts",
        "colors.ts",
        "common.ts",
        "contextmenu.ts",
        "diagnosis-graph-common.html",
        "edge.ts",
        "externs.ts",
        "graph.ts",
        "hierarchy.ts",
        "layout.ts",
        "minimap.ts",
        "node.ts",
        "op.ts",
        "parser.ts",
        "proto.ts",
        "render.ts",
        "scene.ts",
        "template.ts",
        "util.ts",
    ],
    path = "/diagnosis-graph-common",
    deps = [
        "//explainer_plugin/_2_diagnosis/toolbar/tools",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:dagre",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:graphlib",
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
