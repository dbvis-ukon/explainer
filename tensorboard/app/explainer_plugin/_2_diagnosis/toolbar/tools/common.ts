module diagnosis.tools {

    export enum ToolCategory {
        NONE = 0,
        WEIGHTS = 1,
        GRAPHFLOW = 2,
        MODEL = 3,
        GRAD = 4,
        LRP = 5,
        GLOBAL = 6,
    }

    export const AllToolCategories: ToolCategory[] = [
        ToolCategory.GLOBAL,
        ToolCategory.GRAD,
        ToolCategory.LRP,
        ToolCategory.MODEL,
        ToolCategory.GRAPHFLOW,
        ToolCategory.WEIGHTS,
    ];

    export enum Tool {
        NONE = 0,

        WEIGHTS_HISTOTREND = 10,
        WEIGHTS_MINMAX = 11,
        WEIGHTS_DEAD = 12,
        WEIGHTS_SATURATED = 13,

        GRAPHFLOW_IMAGE = 20,
        GRAPHFLOW_INFOFLOW = 21,

        MODEL_FUNCTION = 30,
        MODEL_LOSS = 31,

        GRAD_GRADINPUT = 40,
        GRAD_INTGRAD = 41,
        GRAD_GRAD = 42,
        GRAD_SMOOTHGRAD = 43,
        GRAD_INPUTTGRAD = 44,
        GRAD_INTEGGRAD = 45,

        LRP_LRPZ = 50,
        LRP_LRPZEPSILON = 51,
        LRP_LRPSEQAFLAT = 52,
        LRP_LRPSEQBFLAT = 53,
        LRP_ELRP = 54,

        GLOBAL_LIME = 60,
        GLOBAL_SALIENCY = 61,
        GLOBAL_DEEPLIFT = 62,
        GLOBAL_DECONVNET = 63,

        GLOBAL_ANCHORS = 64,
        GLOBAL_CAV = 65,
    }

    export interface ToolSpec {
        name: string;
        icon: string;
        color: string;
        category: ToolCategory;
        backendRoute?: string;
    }

    export interface ToolCategorySpec {
        name: string;
        tools: Tool[];
    }

    export function getToolCategorySpec(toolCategory: ToolCategory): ToolCategorySpec {
        switch (toolCategory) {
            case ToolCategory.WEIGHTS:
                return {
                    name: "Weights", tools: [
                        Tool.WEIGHTS_HISTOTREND,
                        Tool.WEIGHTS_MINMAX,
                        Tool.WEIGHTS_DEAD,
                        Tool.WEIGHTS_SATURATED,

                    ]
                };
            case ToolCategory.GRAPHFLOW:
                return {
                    name: "Graph Flow", tools: [
                        Tool.GRAPHFLOW_IMAGE,
                        Tool.GRAPHFLOW_INFOFLOW,
                    ]
                };
            case ToolCategory.MODEL:
                return {
                    name: "Model", tools: [
                        Tool.MODEL_FUNCTION,
                        Tool.MODEL_LOSS,
                    ]
                };
            case ToolCategory.GRAD:
                return {
                    name: "Global Gradient Propagation Methods", tools: [
                        Tool.GRAD_GRADINPUT,
                        Tool.GRAD_INTGRAD,
                        Tool.GRAD_GRAD,
                        Tool.GRAD_SMOOTHGRAD,
                        Tool.GRAD_INPUTTGRAD,
                        Tool.GRAD_INTEGGRAD,
                        Tool.GLOBAL_DEEPLIFT,
                        Tool.GLOBAL_SALIENCY,
                        Tool.GLOBAL_DECONVNET,
                    ]
                };
            case ToolCategory.LRP:
                return {
                    name: "Global Layer-wise Relevance Propagation", tools: [
                        Tool.LRP_LRPZ,
                        Tool.LRP_LRPZEPSILON,
                        // Tool.LRP_LRPSEQAFLAT,
                        // Tool.LRP_LRPSEQBFLAT,
                        Tool.LRP_ELRP,
                    ]
                };
            case ToolCategory.GLOBAL:
                return {
                    name: "Global Surrogate Models", tools: [
                        Tool.GLOBAL_LIME,
                        Tool.GLOBAL_ANCHORS,
                        Tool.GLOBAL_CAV,
                    ]
                };
            default:
                return {name: "", tools: []}
        }
    }

    export function getToolSpec(tool: Tool): ToolSpec {
        switch (tool) {
            case Tool.WEIGHTS_HISTOTREND:
                return {name: "HistoTrend", icon: "av:equalizer", color: "#95AE37", category: ToolCategory.WEIGHTS};
            case Tool.WEIGHTS_MINMAX:
                return {name: "MinMax", icon: "icons:swap-vert", color: "#95AE37", category: ToolCategory.WEIGHTS};
            case Tool.WEIGHTS_DEAD:
                return {name: "DeadWeight", icon: "icons:trending-down", color: "#95AE37", category: ToolCategory.WEIGHTS};
            case Tool.WEIGHTS_SATURATED:
                return {name: "SaturatedWeight", icon: "icons:trending-up", color: "#95AE37", category: ToolCategory.WEIGHTS};

            case Tool.GRAPHFLOW_IMAGE:
                return {name: "ImageInterpreter", icon: "editor:border-clear", color: "#59AE37", category: ToolCategory.GRAPHFLOW};
            case Tool.GRAPHFLOW_INFOFLOW:
                return {name: "InformationFlow", icon: "communication:call-split", color: "#59AE37", category: ToolCategory.GRAPHFLOW};

            case Tool.MODEL_FUNCTION:
                return {name: "FunctionExplainer", icon: "icons:gesture", color: "#3795AE", category: ToolCategory.MODEL};
            case Tool.MODEL_LOSS:
                return {name: "LossDecay", icon: "icons:timeline", color: "#3795AE", category: ToolCategory.MODEL};

            case Tool.GRAD_GRADINPUT:
                return {name: "Grad*Input", icon: "image:gradient", color: "#3759AE", category: ToolCategory.GRAD, backendRoute: "/gradient/grad*input"};
            case Tool.GRAD_INTGRAD:
                return {name: "IntGrad", icon: "image:gradient", color: "#3759AE", category: ToolCategory.GRAD, backendRoute: "/gradient/intgrad"};
            case Tool.GRAD_GRAD:
                return {name: "Gradient", icon: "image:gradient", color: "#3759AE", category: ToolCategory.GRAD, backendRoute: "/gradient/gradient"};
            case Tool.GRAD_SMOOTHGRAD:
                return {name: "SmoothGrad", icon: "image:gradient", color: "#3759AE", category: ToolCategory.GRAD, backendRoute: "/gradient/smoothgrad"};
            case Tool.GRAD_INPUTTGRAD:
                return {name: "Input Times Gradient", icon: "image:gradient", color: "#3759AE", category: ToolCategory.GRAD, backendRoute: "/gradient/input_t_gradient"};
            case Tool.GRAD_INTEGGRAD:
                return {name: "Integrated Gradients", icon: "image:gradient", color: "#3759AE", category: ToolCategory.GRAD, backendRoute: "/gradient/integrated_gradients"};
            case Tool.GLOBAL_SALIENCY:
                return {name: "Saliency", icon: "image:center-focus-strong", color: "#3759AE", category: ToolCategory.GLOBAL, backendRoute: "/saliency"};
            case Tool.GLOBAL_DEEPLIFT:
                return {name: "DeepLift", icon: "image:monochrome-photos", color: "#3759AE", category: ToolCategory.GLOBAL, backendRoute: "/deeplift"};
            case Tool.GLOBAL_DECONVNET:
                return {name: "DeConvNet", icon: "image:grid-on", color: "#3759AE", category: ToolCategory.GLOBAL, backendRoute: "/deconvnet"};

            case Tool.LRP_LRPZ:
                return {name: "z-LRP", icon: "image:filter-none", color: "#AE3795", category: ToolCategory.LRP, backendRoute: "/lrp/lrp.z"};
            case Tool.LRP_LRPZEPSILON:
                return {name: "e-LRP (fast)", icon: "image:filter-none", color: "#AE3795", category: ToolCategory.LRP, backendRoute: "/lrp/lrp.epsilon"};
            case Tool.LRP_LRPSEQAFLAT:
                return {name: "lrp.sequential_preset_a_flat", icon: "image:filter-none", color: "#AE3795", category: ToolCategory.LRP, backendRoute: "/lrp/lrp.sequential_preset_a_flat"};
            case Tool.LRP_LRPSEQBFLAT:
                return {name: "lrp.sequential_preset_b_flat", icon: "image:filter-none", color: "#AE3795", category: ToolCategory.LRP, backendRoute: "/lrp/lrp.sequential_preset_b_flat"};
            case Tool.LRP_ELRP:
                return {name: "e-LRP (slow)", icon: "image:filter-none", color: "#AE3795", category: ToolCategory.LRP, backendRoute: "/lrp/elrp"};

            case Tool.GLOBAL_LIME:
                return {name: "Lime", icon: "image:filter-b-and-w", color: "#AE3759", category: ToolCategory.GLOBAL, backendRoute: "/lime"};
            case Tool.GLOBAL_ANCHORS:
                return {name: "Anchors", icon: "image:filter-b-and-w", color: "#AE3759", category: ToolCategory.GLOBAL, backendRoute: "/lime"};
            case Tool.GLOBAL_CAV:
                return {name: "Cav", icon: "image:filter-b-and-w", color: "#AE3759", category: ToolCategory.GLOBAL, backendRoute: "/lime"};

            default:
                return {name: "", icon: "", color: "#FFFFFF", category: ToolCategory.NONE}
        }
    }

    export function getApplicableTools(nodeType: string): Tool[] {
        switch (nodeType) {
            case "TensorSummaryV2":
                return [Tool.WEIGHTS_HISTOTREND, Tool.WEIGHTS_MINMAX];
            default:
                return [];
        }
    }


    const svgVisSelector = "#diagnosis-tool-svg";
    const svgVerbSelector = "#diagnosis-tool-verb-svg";

    export interface Tensor {
        content: {
            min: number;
            max: number;
            mean: number;
            median: number;
            stddev: number;
            histogram: {
                hist: number[];
                bin_edges: number[]
            }
        }
        step: number;
        wall_time: number
    }

    export interface HistogramBin {
        binSize: number;
        maxBinSize: number;
        binEdgeHigh: number;
        binEdgeLow: number
    }

    export interface HistogramTensor {
        step: number;
        histogram: HistogramBin[];
    }

    export function getVisSVG() {
        return d3.select(svgVisSelector);
    }

    export function getVerbSVG() {
        return d3.select(svgVerbSelector);
    }

    export function clearVisSVG() {
        getVisSVG().selectAll("*").remove();
    }

    export function clearVerbSVG() {
        getVerbSVG().selectAll("*").remove();
    }

    export function getDims(svg): { height: number, width: number } {
        console.log("Bbox: "+svg.node().getBoundingClientRect().height);
        return {
            //height: Number(svg.attr("height")),
            //width: Number(svg.attr("width"))
            height: Number(svg.node().getBoundingClientRect().height),
            width: Number(svg.node().getBoundingClientRect().width)
        };
    }

    export function getTensor(tensorDataset, nodeName): Tensor[] {
        return tensorDataset[nodeName];
    }

    export function argMax(array) {
        return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
    }
}
