package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:defs.bzl", "tensorboard_webcomponent_library")
load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "diagnosis_graph",
    srcs = [
        "diagnosis-graph.html",
    ],
    path = "/diagnosis-graph",
    deps = [
        ":graph_loader",
        ":graph_scene",
        "//explainer_plugin/_2_diagnosis/graph/graph_common",
        "@org_polymer_iron_icons",
        "@org_polymer_paper_button",
        "@org_polymer_paper_icon_button",
        "@org_polymer_paper_input",
        "@org_polymer_paper_toggle_button",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_dashboard_common",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:dagre",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:graphlib",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:lodash",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "graph_scene",
    srcs = [
        "diagnosis-graph-scene.html",
    ],
    path = "/diagnosis-graph",
    deps = [
        "//explainer_plugin/_2_diagnosis/graph/graph_common",
        "//explainer_plugin/_2_diagnosis/toolbar/tools",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_dashboard_common",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:dagre",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:graphlib",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:lodash",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "graph_loader",
    srcs = ["diagnosis-graph-loader.html"],
    path = "/diagnosis-graph",
    deps = [
        "//explainer_plugin/_2_diagnosis/graph/graph_common",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)
