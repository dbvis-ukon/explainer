declare const $: any;
declare const math: any;

module diagnosis.tools.backend {
    import ToolSpec = diagnosis.tools.ToolSpec;

    /*************************************************************
     * RawImage:                                                 *
     * JS-Array of shape [width, height, RGB] in range [0, 255]. *
     *************************************************************/

    function imageElementToRawImage(img: HTMLImageElement, targetWidth: number, targetHeight: number) {
        // Create an empty canvas element
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        const ctx = canvas.getContext("2d");
        ctx.scale(targetWidth / img.width, targetHeight / img.height);
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);

        // Convert image data from UInt8ClampedArray to JS array.
        const imageDataArray = Array.from(imageData.data);

        // Resize into RGBA pixels.
        let rawImage = math.reshape(imageDataArray, [imageDataArray.length / 4, 4]);
        // Discard alpha channel by deleting last column.
        rawImage = math.resize(rawImage, [imageDataArray.length / 4, 3]);
        // Reshape into [width, height, 3].
        rawImage = math.reshape(rawImage, [targetWidth, targetHeight, 3]);

        return rawImage;
    }

    function rawImageToBase64(rawImageRGB) {
        const imgSize = math.size(rawImageRGB);
        imgSize[2] = 4;
        const rawImageRGBA = math.resize(rawImageRGB, imgSize, 255);

        const imageRawFlat = new Uint8ClampedArray(math.flatten(rawImageRGBA));
        const imageData = new ImageData(imageRawFlat, imgSize[0], imgSize[1]);

        const domCanvas = document.createElement('canvas');
        domCanvas.setAttribute('width', "" + imageData.width);
        domCanvas.setAttribute('height', "" + imageData.height);
        const domCanvas2DContext = domCanvas.getContext("2d");

        if (domCanvas2DContext) {
            domCanvas2DContext.putImageData(imageData, 0, 0);
            return domCanvas.toDataURL("image/png");
        }

        return null;
    }

    function showExplanationImages(rawInputImageRGB, rawExplainedImageRGB, predictedClass) {
        const inputImageBase64 = rawImageToBase64(rawInputImageRGB);
        const explainedImageBase64 = rawImageToBase64(rawExplainedImageRGB);

        const svg = diagnosis.tools.getVisSVG();

        svg.selectAll('.loading-icon').remove();

        svg.append('image')
            .attr('x', 20)
            .attr('y', 50)
            .attr('width', 200)
            .attr('height', 200)
            .attr('xlink:href', inputImageBase64);

        svg.append('image')
            .attr('x', 240)
            .attr('y', 50)
            .attr('width', 200)
            .attr('height', 200)
            .attr('xlink:href', explainedImageBase64);

        svg.select('.predicted-class-text')
            .text("Predicted Class: " + predictedClass);
    }

    const addLabelsFn = (selection, explanationMethod, runName) => {
        // Explanation method label
        const explanationLabel = selection.append('text')
            .text(explanationMethod)
            .attr('style', 'dominant-baseline: baseline')
            .attr('x', 20)
            .attr('y', 30);

        // Tensor name
        const explanationLabelBBox = explanationLabel.node().getBBox();
        const runLabel = selection.append("text")
            .attr('x', (explanationLabelBBox.x + explanationLabelBBox.width + 20))
            .attr('y', 30)
            .style("text-anchor", "start")
            .style("dominant-baseline", "baseline")
            .style("font-size", "10px")
            .style("font-family", "mono")
            .text("[" + runName + "]");

        // Predicted class
        const runLabelBBox = runLabel.node().getBBox();
        selection.append("text")
            .attr('class', 'predicted-class-text')
            .attr('x', (runLabelBBox.x + runLabelBBox.width + 20))
            .attr('y', 30)
            .style("text-anchor", "start")
            .style("dominant-baseline", "baseline")
            .style("font-size", "10px")
            .style("font-family", "mono")
            .style("fill", "#a40004")
            .style("font-weight", "bold"); // Text is added later, when prediction is available.
    };

    function loadingIconFn(selection) {
        const loadingIconAnimation = selection.append('g')
            .attr('class', 'loading-icon')
            .attr('transform', 'translate(215 110) scale(0.5)')
            .append('g');

        loadingIconAnimation.append('path')
            .attr('d', "M 50,0 A 50.000001,50.000001 0 0 0 0,50 50.000001,50.000001 0 0 0 50,100 50.000001,50.000001 0 0 0 100,50 50.000001,50.000001 0 0 0 50,0 Z m 0,15 A 35.000001,35.000001 0 0 1 85,50 35.000001,35.000001 0 0 1 50,85 35.000001,35.000001 0 0 1 15,50 35.000001,35.000001 0 0 1 50,15 Z")
            .attr('style', 'fill: #0049cb; opacity: 0.5;');

        loadingIconAnimation.append('path')
            .attr('d', "m 50,0 v 15 a 35.000001,35.000001 0 0 1 35,35 h 15 A 50,50 0 0 0 50,0 Z")
            .attr('style', 'fill: #0049cb;');

        loadingIconAnimation.append('animateTransform')
            .attr('from', '0 50 50')
            .attr('to', '360 50 50')
            .attr('type', 'rotate')
            .attr('attributeName', 'transform')
            .attr('repeatCount', 'indefinite')
            .attr('dur', '2s');

    }

    function doExplanationRequest(inputImageURL: string, route: string, runName: string) {
        const backendURL = 'http://127.0.0.1:5000' + route;

        const modelTypeWorkaround = runName === "MNIST CNN" ? "cnn" : "dense";

        const modelArchtiectureURL = "http://127.0.0.1:8000/" + modelTypeWorkaround + "_architecture.json";
        const modelURL = "http://127.0.0.1:8000/" + modelTypeWorkaround + "_model.h5";

        const modelArchitecturePromise = $.get(modelArchtiectureURL);
        const modelPromise = $.ajax(
            {
                url: modelURL,
                cache: false,
                xhrFields:
                    {
                        responseType: 'blob'
                    }
            });

        Promise.all([modelArchitecturePromise, modelPromise]).then(([modelArchitecture, model]) => {
            const img = new Image();
            img.onload = () => {
                const targetImgWidth = 28;
                const targetImgHeight = 28;

                const rawInputImageRGB = imageElementToRawImage(img, targetImgWidth, targetImgHeight);

                // Convert to TF input, e.g. reshape to [batch, width, height, channels] and transform [0, 255] -> [0, 1].
                let tfInput = math.divide(math.reshape(rawInputImageRGB, [1, targetImgWidth, targetImgHeight, 3]), 255);

                // Now we have everything. Image data, model and model architecture. Now explain!
                const fd = new FormData;
                fd.append("architecture", JSON.stringify(modelArchitecture));
                fd.append("data", JSON.stringify(tfInput));
                fd.append("model", model, "model");

                const xhr = new XMLHttpRequest();
                xhr.open("POST", backendURL, true);
                xhr.send(fd);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        const parsedRespones = JSON.parse(xhr.response);
                        console.log("parsedresponse\n",parsedRespones);
                        const prediction = diagnosis.tools.argMax(parsedRespones.prediction[0]);
                        const rawExplainedImageRGB = math.multiply(parsedRespones.explanation, 255);

                        showExplanationImages(rawInputImageRGB, rawExplainedImageRGB, prediction);
                    }
                }
            };
            img.crossOrigin = "Anonymous"; // TODO: Remove cross-origin ignore
            img.src = inputImageURL;
        });
    }

    export function backendExplainer(toolSpec: ToolSpec, runName: string, imageUrl: string) {
        const svg = diagnosis.tools.getVisSVG();
        svg.call(loadingIconFn);
        svg.call(addLabelsFn, toolSpec.name, runName);

        doExplanationRequest(imageUrl, toolSpec.backendRoute, runName);
    }
}