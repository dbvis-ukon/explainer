module refinement.recommendations {

    export const allRecommendations = [
        "architectures_convolution",
    ];

    export function getContent(identifier: string) {
        switch (identifier) {
            case "architectures_convolution":
                return refinement.recommendations.architectures.getConvolutionContent();
            default:
                return "";
        }
    }
}