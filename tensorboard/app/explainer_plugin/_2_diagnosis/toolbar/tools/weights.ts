module diagnosis.tools.weights {
    import Tensor = diagnosis.tools.Tensor;
    import HistogramTensor = diagnosis.tools.HistogramTensor;

    export function minMax(tensorSteps: Tensor[], runName, tensorName: string) {

        const svg = diagnosis.tools.getVisSVG();

        const stepList: number[] = tensorSteps.map(t => t.step);
        const minList: number[] = tensorSteps.map(t => t.content.min);
        const maxList: number[] = tensorSteps.map(t => t.content.max);

        const allMin: number = d3.min([d3.min(minList), d3.min(maxList)]);
        const allMax: number = d3.max([d3.max(minList), d3.max(maxList)]);

        const {width, height} = diagnosis.tools.getDims(svg);
//        console.log("w&h: ",width,height)
        //const margin = ({top: 20, right: 30, bottom: 50, left: 40});
        const margin = ({top: height*0.2, right: 0, bottom: height*0.15, left: width*0.1});


        const x = d3.scaleLinear()
            .domain([d3.min(stepList), d3.max(stepList)])
            .range([margin.left, (width - margin.right)]);

        const y = d3.scaleLinear()
            .domain([allMin, allMax])
            .range([height - margin.bottom, margin.top]);

        const minLine = d3.line<Tensor>()
            .x((d: Tensor) => {
                return x(d.step);
            })
            .y((d: Tensor) => {
                return y(d.content.min);
            });

        const maxLine = d3.line<Tensor>()
            .x((d: Tensor) => {
                return x(d.step);
            })
            .y((d: Tensor) => {
                return y(d.content.max);
            });

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickSizeOuter(10));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5).tickSizeOuter(10));

        svg.append("path")
            .attr("style", "fill:none;stroke:#4682B4;stroke-width:2;stroke-linejoin:round;stroke-linecap:round;")
            .attr("d", minLine(tensorSteps));

        svg.append("path")
            .attr("style", "fill:none;stroke:#9E0303;stroke-width:2;stroke-linejoin:round;stroke-linecap:round;")
            .attr("d", maxLine(tensorSteps));

        svg.call(addLabelsFn, width, height, margin, runName, tensorName);
    }


    function tensorToHistogramTensor(t: Tensor) {
        const maxBinSize = t.content.histogram.hist.reduce((acc, curr) => {
            return Math.max(acc, curr);
        }, 0);

        const histogram = t.content.histogram.hist.map((binSize: number, index: number) => {
            return {
                binSize: binSize,
                maxBinSize: maxBinSize,
                binEdgeLow: t.content.histogram.bin_edges[index],
                binEdgeHigh: t.content.histogram.bin_edges[index + 1],
            };
        });

        return {
            step: t.step,
            histogram: histogram
        };
    }

    export function histoTrend(tensorSteps: Tensor[], runName: string, tensorName: string) {

        const svg = diagnosis.tools.getVisSVG();

        const stepList: number[] = tensorSteps.map(t => t.step);
        const minList: number[] = tensorSteps.map(t => t.content.min);
        const maxList: number[] = tensorSteps.map(t => t.content.max);

        const allMin: number = d3.min([d3.min(minList), d3.min(maxList)]);
        const allMax: number = d3.max([d3.max(minList), d3.max(maxList)]);

        const histogramTensors = tensorSteps.map(t => tensorToHistogramTensor(t));

        const {width, height} = diagnosis.tools.getDims(svg);
        //const margin = ({top: 20, right: 30, bottom: 50, left: 40});
        const margin = ({top: height*0.2, right: 0, bottom: height*0.15, left: width*0.1});

        const x = d3.scaleLinear()
            .domain([d3.min(stepList), d3.max(stepList)])
            .range([margin.left, (width - margin.right)]);

        const y = d3.scaleLinear()
            .domain([allMin, allMax])
            .range([height - margin.bottom, margin.top]);

        const color = (binSize, maxBinSize) => {
            return d3.scaleSequential(d3.interpolateRgbBasis(["white", "red"]))
                .domain([0, maxBinSize])(binSize);
        };

        const histogram = (selection) => {
            // Per tensor iterate over all histogram values and build up rects.
            selection.selectAll(".histogram-rect")
                .data(d => d.histogram)
                .enter()
                .append("rect")
                .attr("class", "histogram-rect")
                .attr("style", d => `fill:${color(d.binSize, d.maxBinSize)};`)
                .attr("x", 0)
                .attr("y", d => y(d.binEdgeHigh))
                .attr("width", 2)
                .attr("height", d => y(d.binEdgeLow) - y(d.binEdgeHigh))
        };

        svg.append("g")
            .attr("class", "histograms")
            .selectAll(".histogram")
            .data(histogramTensors)
            .enter()
            .append("g")
            .attr("transform", d => `translate(${x(d.step)},0)`)
            .attr("class", "histogram")
            .call(histogram);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickSizeOuter(10));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5).tickSizeOuter(10));

        svg.call(addLabelsFn, width, height, margin, runName, tensorName);
    }

    const addLabelsFn = (selection, width, height, margin, runName, tensorName) => {
        // X-Axis label
        selection.append("text")
            .attr("transform",
                "translate(" + ((width - (margin.right - margin.left)) / 2) + " ," +
                (height - margin.bottom + 30) + ")")
            .style("text-anchor", "middle")
            .style("dominant-baseline", "hanging")
            .style("font-size", "12")
            .style("font-family", "sans-serif")
            .text("Steps");

        // Tensor name
        selection.append("text")
            .attr("transform",
                "translate(" + (margin.right + 20) + " ," +
                (margin.top*0.6) + ")")
            .style("text-anchor", "start")
            .style("dominant-baseline", "hanging")
            .style("font-size", "10")
            .style("font-family", "mono")
            .text("[" + runName + "] " + tensorName);
    }
}