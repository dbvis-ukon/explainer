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
        "understanding-graph-common.html",
        "util.ts",
    ],
    path = "/understanding-graph-common",
    deps = [
        "//explainer_plugin/_1_understanding/toolbar/tools",
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
#    destdir = "tf-understanding-graph-common",
#    deps = [
#        "//third_party/javascript/polymer/v1/polymer:lib",
#        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports_google:lib",
#    ],
#)
