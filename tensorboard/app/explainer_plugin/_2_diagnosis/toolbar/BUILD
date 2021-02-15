package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:defs.bzl", "tensorboard_webcomponent_library")
load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "diagnosis_toolbar",
    srcs = ["diagnosis-toolbar.html"],
    path = "/diagnosis-toolbar",
    deps = [
        "//explainer_plugin/_2_diagnosis/toolbar/tools",
        "@org_polymer_iron_icon",
        "@org_polymer_iron_icons",
        "@org_polymer_paper_button",
        "@org_polymer_paper_dropdown_menu",
        "@org_polymer_paper_icon_button",
        "@org_polymer_paper_item",
        "@org_polymer_paper_menu",
        "@org_polymer_paper_radio_group",
        "@org_polymer_paper_toggle_button",
        "@org_polymer_paper_tooltip",
    ],
)

tf_web_library(
    name = "diagnosis_tool_visualization_card",
    srcs = ["diagnosis-tool-visualization-card.html"],
    path = "/diagnosis-toolbar",
    deps = [
        ":diagnosis_tool_image_selection",
        ":diagnosis_tool_visualization",
        "//explainer_plugin/_2_diagnosis/toolbar/tools",
        "//explainer_plugin/common:jquery",
        "//explainer_plugin/common:provenance_bar_entry",
        "@org_polymer_iron_icon",
        "@org_polymer_iron_icons",
        "@org_polymer_paper_button",
        "@org_polymer_paper_material",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "diagnosis_tool_verbalization_card",
    srcs = ["diagnosis-tool-verbalization-card.html"],
    path = "/diagnosis-toolbar",
    deps = [
        ":diagnosis_tool_verbalization",
        "//explainer_plugin/_2_diagnosis/toolbar/tools",
        "//explainer_plugin/common:jquery",
        "//explainer_plugin/common:provenance_bar_entry",
        "@org_polymer_iron_icon",
        "@org_polymer_iron_icons",
        "@org_polymer_paper_button",
        "@org_polymer_paper_material",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "diagnosis_tool_visualization",
    srcs = ["diagnosis-tool-visualization.html"],
    path = "/diagnosis-toolbar",
    deps = [
        "//explainer_plugin/_2_diagnosis/toolbar/tools",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "diagnosis_tool_verbalization",
    srcs = ["diagnosis-tool-verbalization.html"],
    path = "/diagnosis-toolbar",
    deps = [
        "//explainer_plugin/_2_diagnosis/toolbar/tools",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "diagnosis_tool_image_selection",
    srcs = ["diagnosis-tool-image-selection.html"],
    path = "/diagnosis-toolbar",
    deps = [
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)
