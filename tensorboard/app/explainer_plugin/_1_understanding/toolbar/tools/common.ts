module understanding.tools {

    export enum Tool {
        NONE = 0,
        WIKI = 1,
        TOPO_NLG = 2,
        KERNEL_IMG = 3
    }

    export const AllTools: Tool[] = [
        Tool.WIKI,
        Tool.TOPO_NLG,
        Tool.KERNEL_IMG
    ];

    export interface ToolSpec {
        name: string;
        icon: string;
        color: string;
    }

    export function getToolSpec(tool: Tool): ToolSpec {
        switch (tool) {
            case Tool.WIKI:
                return { name: "Wiki Entries", icon: "av:library-books", color: "#3795AE" };
            case Tool.TOPO_NLG:
                return { name: "Topology in Text", icon: "communication:textsms", color: "#95AE37" };
            case Tool.KERNEL_IMG:
                return { name: "Kernel Images", icon: "icons:perm-media", color: "#AE3759" };
            default:
                return { name: "", icon: "", color: "#FFFFFF" }
        }
    }

    export function getApplicableTools(nodeType: string): Tool[] {
        switch (nodeType) {
            default:
                return [];
        }
    }

    const svgSelector = "#understanding-tool-svg";
    const divSelector = "#understanding-tool-div";

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

    export function getDIV() {
        return $(divSelector);
    }

    export function clearDIV() {
        $(divSelector).empty();
    }

    export function getSVG() {
        return d3.select(svgSelector);
    }

    export function clearSVG() {
        d3.select(svgSelector).selectAll("*").remove();
    }

    export function getDims(svg): { height: number, width: number } {
        return {
            height: Number(svg.attr("height")),
            width: Number(svg.attr("width"))
        };
    }

    export function getTensor(tensorDataset, nodeName): Tensor[] {
        return tensorDataset[nodeName];
    }
}
