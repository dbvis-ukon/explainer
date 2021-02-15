load("@io_bazel_rules_closure//closure:defs.bzl", "filegroup_external")

def explainer_js_lib_workspace():
    filegroup_external(
        name = "com_jquery",
        # no @license header
        licenses = ["notice"],  # MIT
        sha256_urls = {
            "d8aa24ecc6cecb1a60515bc093f1c9da38a0392612d9ab8ae0f7f36e6eee1fad": [
                "https://code.jquery.com/jquery-3.3.1.js",
            ],
        },
    )

    filegroup_external(
        name = "org_mathjs",
        # no @license header
        licenses = ["notice"],  # MIT
        sha256_urls = {
            "1aa147873b11311b75c935b26ed8e7d4f35d7e32f38c83d8a4b7e60164916623": [
                "https://unpkg.com/mathjs@5.6.0/dist/math.min.js",
            ],
        },
    )

    filegroup_external(
        name = "com_susielu_d3_annotation",
        # no @license header
        licenses = ["notice"],  # MIT
        sha256_urls = {
            "90d0524bdeeb5f3b71e835e41ad129bf53fd7cd154614d35c063eb1f98660c46": [
                "https://cdnjs.cloudflare.com/ajax/libs/d3-annotation/2.3.2/d3-annotation.js",
            ],
        },
    )
