package(default_visibility = ["//visibility:public"])

load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "refinement_recommendations",
    srcs = [
        "refinement-recommendations.html",
    ],
    path = "/refinement",
    deps = [
        "//explainer_plugin/_3_refinement/refinement_recommendations:refinement_recommendation_card",
        "//explainer_plugin/_3_refinement/refinement_recommendations/content:recommendation_contents",
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
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:lodash",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "refinement_recommendation_card",
    srcs = [
        "refinement-recommendation-card.html",
    ],
    path = "/refinement",
    deps = [
        ":refinement_recommendation",
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
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:lodash",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)

tf_web_library(
    name = "refinement_recommendation",
    srcs = ["refinement-recommendation.html"],
    path = "/refinement",
    deps = [
        "//explainer_plugin/_3_refinement/refinement_recommendations/content:recommendation_contents",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:d3",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:polymer",
    ],
)
