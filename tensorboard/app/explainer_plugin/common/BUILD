package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:defs.bzl", "tensorboard_webcomponent_library")
load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")
load("//third_party:js-lib.bzl", "explainer_js_lib_workspace")

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "provenance_bar",
    srcs = ["provenance-bar.html"],
    path = "/common",
    deps = [
        ":provenance_bar_entry",
        "@org_polymer_iron_collapse",
        "@org_polymer_iron_icon",
        "@org_polymer_iron_list",
        "@org_polymer_paper_button",
        "@org_polymer_paper_dropdown_menu",
        "@org_polymer_paper_icon_button",
        "@org_polymer_paper_item",
        "@org_polymer_paper_material",
        "@org_polymer_paper_menu",
        "@org_polymer_paper_radio_group",
        "@org_polymer_paper_slider",
        "@org_polymer_paper_spinner",
        "@org_polymer_paper_toggle_button",
        "@org_polymer_paper_tooltip",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "provenance_bar_entry",
    srcs = ["provenance-bar-entry.html"],
    path = "/common",
    deps = [
        "//explainer_plugin/common:jquery",
        "@org_polymer_iron_collapse",
        "@org_polymer_iron_icon",
        "@org_polymer_iron_icons",
        "@org_polymer_iron_list",
        "@org_polymer_paper_button",
        "@org_polymer_paper_dropdown_menu",
        "@org_polymer_paper_icon_button",
        "@org_polymer_paper_item",
        "@org_polymer_paper_material",
        "@org_polymer_paper_menu",
        "@org_polymer_paper_radio_group",
        "@org_polymer_paper_slider",
        "@org_polymer_paper_spinner",
        "@org_polymer_paper_toggle_button",
        "@org_polymer_paper_tooltip",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "no_data_warning",
    srcs = ["no-data-warning.html"],
    path = "/explainer-common",
    deps = [
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "jquery",
    srcs = [
        "jquery.html",
        "@com_jquery//:jquery-3.3.1.js",
    ],
    path = "/explainer-common",
    visibility = ["//visibility:public"],
)

tf_web_library(
    name = "mathjs",
    srcs = [
        "mathjs.html",
        "@org_mathjs//:math.min.js",
    ],
    path = "/explainer-common",
    visibility = ["//visibility:public"],
)

tf_web_library(
    name = "d3_annotation",
    srcs = [
        "d3-annotation.html",
        "@com_susielu_d3_annotation//:d3-annotation.js",
    ],
    path = "/explainer-common",
    visibility = ["//visibility:public"],
)
