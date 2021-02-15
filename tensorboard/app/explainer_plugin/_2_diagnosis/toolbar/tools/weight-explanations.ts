module diagnosis.tools.weightExplanations {

    export function minMax() {

        const svg = diagnosis.tools.getVerbSVG();
        svg.html(`  <g
     transform="translate(0,5.4260008)"
     id="g1233">
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       x="18.963026"
       y="34.650322"
       id="text902"><tspan
         id="tspan900"
         x="18.963026"
         y="34.650322"
         style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:24.69444466px;font-family:mono;-inkscape-font-specification:'mono Bold';stroke-width:0.26458332">MinMax </tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       x="124.5263"
       y="34.750229"
       id="text906"><tspan
         id="tspan904"
         x="124.5263"
         y="34.750229"
         style="font-style:italic;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:17.63888931px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Italic';stroke-width:0.26458332">Minimum and Maximum Value</tspan></text>
  </g>
  <text
     id="text906-3"
     y="73.760918"
     x="20.041342"
     style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
     xml:space="preserve"><tspan
       id="tspan954"
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332"
       y="83.124687"
       x="20.041342" /></text>
  <g
     transform="translate(0,15)"
     id="g1181">
    <g
       id="g1151">
      <g
         transform="matrix(0.68531854,0,0,0.68531854,197.08208,-58.023113)"
         id="g1052">
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 225.78481,315.66182 c -0.20486,40.04388 0.91031,61.30254 1.60362,99.42427"
           id="path974" />
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 212.212,397.22028 c 50.919,-2.0732 74.14702,-2.58208 124.01307,0.53456 -3.23566,-1.82849 -6.01464,-3.47523 -10.62397,-6.54812"
           id="path976" />
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 336.22507,397.75484 c -3.42013,2.48745 -5.50243,4.21908 -9.42125,6.61491"
           id="path978" />
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 233.28009,324.76659 c -1.99793,-2.06343 -3.33015,-4.38874 -7.49528,-9.10479 -2.67167,4.62424 -4.64072,7.00552 -7.4482,10.37038"
           id="path982" />
        <path
           style="opacity:0.7;fill:none;stroke:#dc0000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 226.78571,361.65922 c 0.30811,-31.14085 -1.91715,-27.90973 7.18155,-28.53722 22.41185,-1.54561 65.30544,-0.217 88.31213,-1.12999"
           id="path988" />
        <path
           style="opacity:0.7;fill:none;stroke:#0376ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 226.78571,361.65922 c 0.96578,22.21933 1.00791,28.17489 6.39663,28.3046 34.95155,0.84135 73.70984,-0.62661 88.26855,0.23149"
           id="path990" />
      </g>
      <g
         transform="matrix(0.68531854,0,0,0.68531854,-51.125372,-59.577312)"
         id="g1060">
        <path
           id="path1004"
           d="m 376.37063,317.92968 c -0.20486,40.04388 0.91031,61.30254 1.60362,99.42427"
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1006"
           d="m 362.79782,399.48814 c 50.919,-2.0732 74.14702,-2.58208 124.01307,0.53456 -3.23566,-1.82849 -6.01464,-3.47523 -10.62397,-6.54812"
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1008"
           d="m 486.81089,400.0227 c -3.42013,2.48745 -5.50243,4.21908 -9.42125,6.61491"
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1010"
           d="m 383.86591,327.03445 c -1.99793,-2.06343 -3.33015,-4.38874 -7.49528,-9.10479 -2.67167,4.62424 -4.64072,7.00552 -7.4482,10.37038"
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1012"
           d="m 377.74951,337.46875 c 40.00525,-2.63385 42.27418,-2.72384 90.95796,-3.20888"
           style="opacity:0.7;fill:none;stroke:#dc0000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1014"
           d="m 378.85447,389.96382 c 34.95155,0.84135 75.97017,-1.50508 90.52888,-0.64698"
           style="opacity:0.7;fill:none;stroke:#0376ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      </g>
      <g
         transform="matrix(0.68531847,0,0,0.68531847,-302.27174,-58.744989)"
         id="g1068">
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 531.24488,316.71522 c -0.20486,40.04388 0.91031,61.30254 1.60362,99.42428"
           id="path974-4" />
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 517.67207,398.27368 c 50.919,-2.0732 74.14702,-2.58208 124.01307,0.53456 -3.23566,-1.82849 -6.01464,-3.47523 -10.62397,-6.54812"
           id="path976-8" />
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 641.68514,398.80824 c -3.42013,2.48745 -5.50243,4.21908 -9.42125,6.61491"
           id="path978-9" />
        <path
           style="opacity:0.7;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 538.74016,325.81999 c -1.99793,-2.06343 -3.33015,-4.38874 -7.49528,-9.10479 -2.67167,4.62424 -4.64072,7.00552 -7.4482,10.37038"
           id="path982-6" />
        <path
           style="opacity:0.7;fill:none;stroke:#dc0000;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 532.18747,377.82119 c 62.18881,-17.93163 86.05189,-43.30052 94.79604,-56.49304"
           id="path988-7" />
        <path
           style="opacity:0.7;fill:none;stroke:#0376ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 532.18747,377.82119 c 31.38755,13.25348 50.33481,11.73515 94.81046,12.64354"
           id="path990-7" />
      </g>
    </g>
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       x="87.614983"
       y="233.60474"
       id="text1099"><tspan
         id="tspan1097"
         x="87.614983"
         y="233.60474"
         style="stroke-width:0.26458332">(a)</tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       x="232.50951"
       y="233.60474"
       id="text1103"><tspan
         id="tspan1101"
         x="232.50951"
         y="233.60474"
         style="stroke-width:0.26458332">(b)</tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       x="377.96213"
       y="233.60474"
       id="text1107"><tspan
         id="tspan1105"
         x="377.96213"
         y="233.60474"
         style="stroke-width:0.26458332">(c)</tspan></text>
  </g>
  <text
     id="text964"
     y="80.950562"
     x="30.041342"
     style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
     xml:space="preserve"><tspan
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332"
       y="80.950562"
       x="30.041342"
       id="tspan962">The MinMax-tool shows the progression of minimum and</tspan><tspan
       id="tspan1243"
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332"
       y="102.11723"
       x="30.041342">maximum value of a tensor over the logged steps.</tspan><tspan
       id="tspan1241"
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332"
       y="123.28389"
       x="30.041342">It can reveal overshooting weights (a), wrong weight</tspan><tspan
       id="tspan966"
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332"
       y="144.45056"
       x="30.041342">initialization (b), or badly chosen learning rate (c).</tspan></text>
  <path
     id="path1237"
     d="M 20,54 H 460"
     style="fill:none;stroke:#c1c1c1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />`);
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

    export function histoTrend() {

        const svg = diagnosis.tools.getVerbSVG();
        svg.html(`  <g
     id="g1233"
     transform="translate(0,5.4260008)">
    <text
       id="text902"
       y="34.650322"
       x="18.963026"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       xml:space="preserve"><tspan
         style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:24.69444466px;font-family:mono;-inkscape-font-specification:'mono Bold';stroke-width:0.26458332"
         y="34.650322"
         x="18.963026"
         id="tspan900">HistoTrend </tspan></text>
    <text
       id="text906"
       y="34.750229"
       x="188.70338"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       xml:space="preserve"><tspan
         style="font-style:italic;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:17.63888931px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Italic';stroke-width:0.26458332"
         y="34.750229"
         x="188.70338"
         id="tspan904">Histograms, over Time</tspan></text>
  </g>
  <text
     xml:space="preserve"
     style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
     x="20.041342"
     y="73.760918"
     id="text906-3"><tspan
       x="20.041342"
       y="83.124687"
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332"
       id="tspan954" /></text>
  <text
     xml:space="preserve"
     style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
     x="30.041342"
     y="80.950562"
     id="text964"><tspan
       id="tspan962"
       x="30.041342"
       y="80.950562"
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332" /></text>
  <text
     id="text854"
     xml:space="preserve"
     style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
     x="30.041342"
     y="80.950562"><tspan
       id="tspan856"
       x="30.041342"
       y="144.45056"
       style="font-size:14.11111069px;line-height:1.5;stroke-width:0.26458332" /></text>
  <path
     style="fill:none;stroke:#c1c1c1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     d="M 20,54 H 460"
     id="path1237" />
  <metadata
     id="metadata1289">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:title></dc:title>
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <text
     id="text895"
     y="78.564781"
     x="30.041342"
     style="font-style:normal;font-weight:normal;font-size:14.11111069px;line-height:1.5;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458335"
     xml:space="preserve"><tspan
       id="tspan897"
       style="stroke-width:0.26458335"
       y="78.564781"
       x="30.041342">The HistoTrend-Tool plots the Histograms of a tensor, one</tspan><tspan
       id="tspan901"
       style="stroke-width:0.26458335"
       y="99.731445"
       x="30.041342">for each logged step. It shows how the distribution of</tspan><tspan
       id="tspan931"
       style="stroke-width:0.26458335"
       y="120.89812"
       x="30.041342">values changes over time and can reveal interesting</tspan><tspan
       id="tspan925"
       style="stroke-width:0.26458335"
       y="142.06477"
       x="30.041342">patterns, such as binning (a) or weight oscillations (b).</tspan></text>
  <g
     transform="translate(49.749926)"
     id="g1823">
    <text
       id="text1099"
       y="248.60474"
       x="87.614983"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       xml:space="preserve"><tspan
         style="stroke-width:0.26458332"
         y="248.60474"
         x="87.614983"
         id="tspan1097">(a)</tspan></text>
    <text
       id="text1103"
       y="248.60474"
       x="278.01785"
       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
       xml:space="preserve"><tspan
         style="stroke-width:0.26458332"
         y="248.60474"
         x="278.01785"
         id="tspan1101">(b)</tspan></text>
    <g
       id="g1455"
       transform="translate(-136.3267,-148.0956)">
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 173.67091,324.26323 c -0.1404,27.44281 0.62385,42.01176 1.09899,68.1373"
         id="path974-4" />
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 164.36921,380.15675 c 34.89573,-1.4208 97.83468,-0.41839 133.90042,0.63657 -2.21746,-1.25309 -5.74334,-3.19233 -8.90219,-5.29823"
         id="path976-8" />
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 298.26963,380.79332 c -2.34388,1.7047 -6.203,3.43189 -8.88864,5.07379"
         id="path978-9" />
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 178.80756,330.5029 c -1.36922,-1.41411 -2.28221,-3.00769 -5.13665,-6.23968 -1.83095,3.16907 -3.18037,4.80101 -5.10439,7.10701"
         id="path982-6" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 177.51659,354.06596 0.1197,3.26022"
         id="path1192" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 177.51659,354.30363 0.1197,3.26022"
         id="path1192-2" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 177.51659,354.07776 0.1197,3.26022"
         id="path1192-6" />
      <path
         id="path1249"
         d="m 185.01553,356.84693 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1251"
         d="m 185.01553,354.43875 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1253"
         d="m 185.01553,353.15454 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 192.51448,358.82849 0.1197,3.26022"
         id="path1257" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 192.51448,354.30363 0.1197,3.26022"
         id="path1259" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 192.51448,351.96108 0.1197,3.26022"
         id="path1261" />
      <path
         id="path1265"
         d="m 200.01342,360.14577 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1267"
         d="m 200.01342,354.0334 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1269"
         d="m 200.01342,350.63251 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 207.51237,360.55112 0.1197,3.26022"
         id="path1273" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 207.51237,354.43875 0.1197,3.26022"
         id="path1275" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 207.51237,348.92118 0.1197,3.26022"
         id="path1277" />
      <path
         id="path1281"
         d="m 215.01131,360.68623 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1283"
         d="m 215.01131,354.57386 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1285"
         d="m 215.01131,347.99795 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 222.51026,363.19697 0.1197,3.26022"
         id="path1289" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 222.51026,354.43875 0.1197,3.26022"
         id="path1291" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 222.51026,346.8045 0.1197,3.26022"
         id="path1293" />
      <path
         id="path1297"
         d="m 230.0092,364.12019 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1299"
         d="m 230.0092,354.30363 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1301"
         d="m 230.0092,345.08187 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 237.77838,365.46005 0.1197,3.26022"
         id="path1305" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 237.50815,354.57386 0.1197,3.26022"
         id="path1307" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 237.50815,343.76459 0.1197,3.26022"
         id="path1309" />
      <path
         id="path1313"
         d="m 252.50602,368.49996 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1315"
         d="m 252.50602,354.97921 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1317"
         d="m 252.50602,339.80146 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 245.00709,366.90116 0.1197,3.26022"
         id="path1321" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 245.00709,354.43875 0.1197,3.26022"
         id="path1323" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 245.00709,342.04197 0.1197,3.26022"
         id="path1325" />
      <path
         id="path1329"
         d="m 260.00495,369.53571 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1331"
         d="m 260.00495,353.89828 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1333"
         d="m 260.00495,337.79731 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 267.50388,369.28807 0.1197,3.26022"
         id="path1337" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 267.50388,354.70898 0.1197,3.26022"
         id="path1339" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 267.50388,335.43299 0.1197,3.26022"
         id="path1341" />
      <path
         id="path1345"
         d="m 275.00281,369.26548 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1347"
         d="m 275.00281,353.62805 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1349"
         d="m 275.00281,333.82289 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 282.50174,370.0423 0.1197,3.26022"
         id="path1353" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 282.50174,352.81736 0.1197,3.26022"
         id="path1355" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 282.50174,334.07054 0.1197,3.26022"
         id="path1357" />
    </g>
    <g
       id="g1717"
       transform="translate(3.3862621,-161.06673)">
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 224.47451,337.23436 c -0.1404,27.44281 0.62385,42.01176 1.09899,68.1373"
         id="path974-4-8" />
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 215.17281,393.12788 c 34.89573,-1.4208 97.83468,-0.41839 133.90042,0.63657 -2.21746,-1.25309 -5.74334,-3.19233 -8.90219,-5.29823"
         id="path976-8-7" />
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 349.07323,393.76445 c -2.34388,1.7047 -6.203,3.43189 -8.88864,5.07379"
         id="path978-9-9" />
      <path
         style="opacity:0.7;fill:none;stroke:#000000;stroke-width:1.37063694;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 229.61116,343.47403 c -1.36922,-1.41411 -2.28221,-3.00769 -5.13665,-6.23968 -1.83095,3.16907 -3.18037,4.80101 -5.10439,7.10701"
         id="path982-6-2" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 228.32019,367.03709 0.1197,3.26022"
         id="path1192-0" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 228.32019,367.27476 0.1197,3.26022"
         id="path1192-2-2" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 228.32019,367.04889 0.1197,3.26022"
         id="path1192-6-3" />
      <path
         id="path1249-7"
         d="m 235.81913,372.99308 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1251-5"
         d="m 235.81913,367.40988 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1253-9"
         d="m 235.81913,360.3048 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 243.31808,376.56215 0.1197,3.26022"
         id="path1257-2" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 243.31808,367.27476 0.1197,3.26022"
         id="path1259-2" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 243.31808,358.053 0.1197,3.26022"
         id="path1261-8" />
      <path
         id="path1265-9"
         d="m 250.81702,378.4086 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1267-7"
         d="m 250.81702,367.00453 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1269-3"
         d="m 250.69732,355.27759 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 258.31597,379.87229 0.1197,3.26022"
         id="path1273-6" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 258.31597,367.40988 0.1197,3.26022"
         id="path1275-1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 258.31597,353.42559 0.1197,3.26022"
         id="path1277-2" />
      <path
         id="path1281-9"
         d="m 265.81491,380.0074 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1283-3"
         d="m 265.81491,367.54499 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1285-1"
         d="m 265.81491,355.67738 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 273.31386,379.34312 0.1197,3.26022"
         id="path1289-9" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 273.31386,367.40988 0.1197,3.26022"
         id="path1291-4" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 273.31386,356.07144 0.1197,3.26022"
         id="path1293-7" />
      <path
         id="path1297-8"
         d="m 280.8128,379.73717 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1299-4"
         d="m 280.8128,367.27476 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1301-5"
         d="m 280.8128,353.81964 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 288.58198,381.07703 0.1197,3.26022"
         id="path1305-0" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 288.31175,367.54499 0.1197,3.26022"
         id="path1307-3" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 288.31175,351.44402 0.1197,3.26022"
         id="path1309-6" />
      <path
         id="path1313-1"
         d="m 303.30962,381.47109 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1315-0"
         d="m 303.30962,367.95034 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1317-6"
         d="m 303.30962,352.77259 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 295.81069,381.98897 0.1197,3.26022"
         id="path1321-3" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 295.81069,367.40988 0.1197,3.26022"
         id="path1323-2" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 295.81069,350.77974 0.1197,3.26022"
         id="path1325-0" />
      <path
         id="path1329-6"
         d="m 310.80855,379.33182 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1331-1"
         d="m 310.80855,366.86941 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1333-5"
         d="m 310.80855,350.76844 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 318.30748,380.14252 0.1197,3.26022"
         id="path1337-5" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 318.30748,367.68011 0.1197,3.26022"
         id="path1339-4" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 318.30748,348.40412 0.1197,3.26022"
         id="path1341-7" />
      <path
         id="path1345-6"
         d="m 325.80641,381.17827 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1347-5"
         d="m 325.80641,366.59918 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         id="path1349-6"
         d="m 325.80641,346.79402 0.1197,3.26022"
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 333.30534,383.01343 0.1197,3.26022"
         id="path1353-9" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 333.30534,365.78849 0.1197,3.26022"
         id="path1355-3" />
      <path
         style="opacity:0.7;fill:#800000;stroke:#dc0000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 333.30534,347.04167 0.1197,3.26022"
         id="path1357-7" />
    </g>
  </g>`);
    }
}