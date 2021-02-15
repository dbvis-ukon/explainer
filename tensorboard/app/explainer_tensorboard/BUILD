load("@org_tensorflow_tensorboard//tensorboard/defs:vulcanize.bzl", "tensorboard_html_binary")
load("@org_tensorflow_tensorboard//tensorboard/defs:web.bzl", "tf_web_library")
load("@org_tensorflow_tensorboard//tensorboard/defs:zipper.bzl", "tensorboard_zip_file")

licenses(["notice"])  # Apache 2.0

py_binary(
    name = "explainer_tensorboard",
    srcs = ["main.py"],
    data = ["assets.zip"],
    main = "main.py",
    srcs_version = "PY2AND3",
    deps = [
        "//explainer_plugin",
        "@org_pocoo_werkzeug",
        "@org_tensorflow_tensorboard//tensorboard:default",
        "@org_tensorflow_tensorboard//tensorboard:program",
    ],
)

tf_web_library(
    name = "index",
    srcs = ["index.html"],
    path = "/",
    deps = [
        "//explainer_plugin/_1_understanding:understanding_dashboard",
        "//explainer_plugin/_2_diagnosis:diagnosis_dashboard",
        "//explainer_plugin/_3_refinement:refinement_dashboard",
        "//explainer_plugin/_4_reporting:reporting_dashboard",
        "//explainer_plugin/common:provenance_bar",
        "//explainer_plugin/common:provenance_bar_entry",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_imports:webcomponentsjs",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_tensorboard",
        "@org_tensorflow_tensorboard//tensorboard/components/tf_tensorboard:default_plugins",
    ],
)

tensorboard_zip_file(
    name = "assets",
    deps = [":index"],
)
