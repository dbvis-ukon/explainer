declare const $: any;

module understanding.tools.wiki {

    export function getWiki(selectedNode: Object, extended: Boolean) {
        
        const dialog_selector = '#dialog .dialog-content';

//        const div = understanding.tools.getDIV();
        const div = $("#understanding-tool-div");
        div.empty();
        $(dialog_selector).html('');

        let nodeType = selectedNode as string;

        let data = [];
        let data_org;

        if (nodeType === '') {
            data_org = _getDesc('neural_network');
            data = _createHTML('Neural Network', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            //_createSVG('Neural Network', data_org);
        }

        if (nodeType.indexOf('dense') > -1) {
            data_org = _getDesc('dense');
            data = _createHTML('Dense Layer', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            _createSVG('Dense Layer', data_org);

        } else if (nodeType.indexOf('conv') > -1) {
            data_org = _getDesc('conv');
            data = _createHTML('Convolutional Layer', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            // data = _createSVG('Dense Layer', data_org);
            // $('#dialog .content').append(data);

        } else if (nodeType.indexOf('pooling') > -1) {
            data_org = _getDesc('pooling');
            data = _createHTML('Max Pooling Layer', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            // data = _createSVG('Dense Layer', data_org);
            // $('#dialog .content').append(data);

        } else if (nodeType.indexOf('dropout') > -1) {
            data_org = _getDesc('dropout');
            data = _createHTML('Dropout Layer', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            // _createSVG('Dense Layer', data_org);

        } else if (nodeType.indexOf('GradientDescent') > -1) {
            data_org = _getDesc('gradient_descent');
            data = _createHTML('Gradient Descent', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            // _createSVG('Dense Layer', data_org);

        } else if (nodeType.indexOf('inference') > -1) {
            data_org = _getDesc('inference');
            data = _createHTML('Inference', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            // _createSVG('Dense Layer', data_org);

        } else if (nodeType.indexOf('cross_entropy') > -1) {
            let data_org = _getDesc('cross_entropy');
            data = _createHTML('Cross Entropy Loss', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            // _createSVG('Dense Layer', data_org);

        } else if (nodeType.indexOf('gradients') > -1) {
            data_org = _getDesc('gradients');
            data = _createHTML('Gradients', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);

            // _createSVG('Dense Layer', data_org);

        }


        if (nodeType.indexOf('bias') > -1) {
            data_org = _getDesc('bias');
            data = _createHTML('Bias', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);
        } else if (nodeType.indexOf('kernel') > -1) {
            let data_org = _getDesc('kernel');
            data = _createHTML('Kernel or Weights', data_org);

            //div.append(data[0]);
            //$(dialog_selector).append(data[1]);
        }

        if(extended)
            div.append(data[1]);
        else
            div.append(data[0]);


    }

    function _createHTML(header, data) {
        //let div = $('<div/>');
//        let div = $("#understanding-tool-div");
//        let dialog = $('<div/>');
        let short ='<h1>' + header + '</h1>';
        short += '<p>' + data[0] + '</p>';
        
        let long = '<h1>' + header + '</h1>'
        long += '<p>' + data[1] + '</p>';
        //dialog.append(new_html);


//        div.append('<paper-button raised id="moreWiki" onclick="dialog.open()">More</paper-button>');        
        //div.append('<paper-button raised id="moreWiki">More</paper-button>');        
        //div.append('<paper-button raised onclick="_clk">More</paper-button>');
        //div.append('<div style="padding: 10px"></div>');

        return [short, long];
    }



    function _getDesc(layer) {
        switch (layer) {
            case 'dense':
                return _dense();
            case 'conv':
                return _con2d();
            case 'pooling':
                return _pooling();
            case 'dropout':
                return _dropout();
            case 'bias':
                return _bias();
            case 'kernel':
                return _kernel();
            case 'gradient_descent':
                return _gradient_descent();
            case 'inference':
                return _inference();
            case 'cross_entropy':
                return _cross_entropy_loss();
            case 'gradients':
                return _gradients();
            case 'neural_network':
                return _neural_network();
            default:
                return '';
        }
    }

    function _createSVG(header, data) {
        let svg = $('#understanding-tool-svg');
        svg = d3.select(svg[0])
            .style("width", '1000px')
            .style("height", '1000px');
        svg.selectAll('*').remove();

        let content = svg.append('g');

        content.append('svg:text')
            .attr('x', 0)
            .attr('y', '1em')
            .attr("dy", ".35em")
            .style('font-size', '2em')
            .style('font-weight', 'bold')
            .text(header);

        let desc = content.append('g')
            .append("text")
            .attr('x', 0)
            .attr('y', '4em');

        desc.selectAll("tspan.text")
            .data(data[2][0].split('<br>'))
            .enter()
            .append("tspan")
            .attr("class", "text")
            .text(d => d)
            .attr("x", 10)
            .attr("dx", 10)
            .attr("dy", 22)
            .style('font-size', '1.2em');

        content.append('svg:image')
            .attr('x', 10)
            .attr('y', '8em')
            //.attr('width', '20em')
            //.attr('height', '20em')
            .attr('xlink:href', data[2][1]);

        content.append('svg:a')
            .attr('xlink:href', data[2][4])
            .append('svg:text')
            .text('Reference')
            .attr('x', 10)
            .attr("dx", 10)
            .attr('y', '28em')
            .style('text-decoration', 'underline')
            .on("mouseover", function() {
                d3.select(this).style('text-decoration', 'none');
            })
            .on("mouseout", function() {
                d3.select(this).style('text-decoration', 'underline');
            });

    }

    function _createImg(link){
        return '<img class="wiki-img" style="display: block;margin: 2vh auto;max-width: 25vw;" src="' + link + '"><br>'
    }

    function _neural_network() {
        let desc = 'Neural networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns. They interpret sensory data through a kind of machine perception, labeling or clustering raw input. <br>' + 
            'The patterns they recognize are numerical, contained in vectors, into which all real-world data, be it images, sound, text or time series, must be translated.'

        let resource_link = 'https://www.bogotobogo.com/python/scikit-learn/images/NeuralNetwork1/NN-with-components-w11-etc.png';
//        let resource = '<img class="wiki-img" src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);
        let additions = '';

        let ref_link = 'https://skymind.ai/wiki/neural-network';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>';

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _dense() {
        let desc = 'A dense layer is a regular layer of neurons in a neural network.<br>'
            +
            'Each neuron recieves input from all the neurons in the previous layer, thus densely connected.<br>'
            +
            'The layer has a weight matrix W, a bias vector b, and the activations of previous layer a.<br>'

        let resource_link = 'https://slugnet.jarrodkahn.com/_images/tikz-be0593f4dad31d763e7f8371668007610e7907c1.png';
//        let resource = '<img class="wiki-img" src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = 'An activation function involves the following but is not limited to it:<br>' +
            _createImg("https://sebastianraschka.com/images/blog/2015/singlelayer_neural_networks_files/perceptron_activation.png");

        let ref_link = 'https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/fc_layer.html';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>';

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _con2d() {
        let desc = 'Convolutional layers apply a convolution operation to the input, passing the result to the next layer. <br>' +
            'The convolution emulates the response of an individual neuron to visual stimuli.<br>' +
            '<br>' +
            'Each convolutional neuron processes data only for its receptive field. Although fully connected feedforward neural networks can be used to learn features as well as classify data, ' +
            'it is not practical to apply this architecture to images. A very high number of neurons would be necessary, even in a shallow (opposite of deep) architecture, due to the very ' +
            'large input sizes associated with images, where each pixel is a relevant variable. For instance, a fully connected layer for a (small) image of size 100 x 100 has 10000 weights ' +
            'for each neuron in the second layer. The convolution operation brings a solution to this problem as it reduces the number of free parameters, allowing the network to be deeper ' +
            'with fewer parameters. For instance, regardless of image size, tiling regions of size 5 x 5, each with the same shared weights, requires only 25 learnable parameters. In this way, ' +
            'it resolves the vanishing or exploding gradients problem in training traditional multi-layer neural networks with many layers by using backpropagation.<br>';

        let resource_link = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Conv_layer.png/229px-Conv_layer.png';
        let resource = _createImg(resource_link);

        let additions = 'An activation function involves the following but is not limited to it:<br>' +
            _createImg("https://sebastianraschka.com/images/blog/2015/singlelayer_neural_networks_files/perceptron_activation.png");

        let ref_link = 'https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/fc_layer.html';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>';

        return [desc, desc + resource + additions + ref, [desc, resource, additions, ref, ref_link]];

    }

    function _pooling() {
        let desc = 'Max pooling is a sample-based discretization process. The objective is to down-sample an input representation (image, hidden-layer output matrix, etc.), ' +
            'reducing its dimensionality and allowing for assumptions to be made about features contained in the sub-regions binned.<br>'
            +
            'This is done in part to help over-fitting by providing an abstracted form of the representation. As well, it reduces the computational cost by reducing the number ' +
            'of parameters to learn and provides basic translation invariance to the internal representation.<br>' +
            'Max pooling is done by applying a max filter to(usually) non - overlapping subregions of the initial representation.<br>'

        let resource_link = 'https://computersciencewiki.org/images/8/8a/MaxpoolSample2.png';
//        let resource = '<img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = '';

        let ref_link = 'https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/fc_layer.html';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>';

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _dropout() {
        let desc = 'Basically during training half of neurons on a particular layer will be deactivated. <br>' +
            'This improves generalization because it forces your layer to learn with different neurons the same "concept".<br><br>'
            +
            'During the prediction phase the dropout is deactivated.<br>'

        let resource_link = 'https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/image_folder_5/dropout.jpeg';
//        let resource = '<img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = '';

        let ref_link = 'https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/fc_layer.html';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>';

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _bias() {
        let desc = 'Bias is like the intercept added in a linear equation. It is an additional parameter in ' +
            'the Neural Network which is used to adjust the output along with the weighted sum of the inputs to the neuron. <br>' +
            'Therefore, Bias is a constant which helps the model in a way that it can fit best for the given data.<br>'

        let resource_link = 'https://cdncontribute.geeksforgeeks.org/wp-content/uploads/Screenshot-from-2018-09-09-19-40-18.png';
//        let resource = '<img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = '';

        let ref_link = 'https://www.geeksforgeeks.org/effect-of-bias-in-neural-network/'
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>'

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _kernel() {
        let desc = 'The weight shows the effectiveness of a particular input. More the weight of input, more it will have impact on network.<br>' +
            'In Neural network, some inputs are provided to an artificial neuron, and with each input a weight is associated. <br>' +
            'Weight increases the steepness of the activation function. This means weight decide how fast the activation function will trigger. <br>'

        let resource_link = 'https://cdncontribute.geeksforgeeks.org/wp-content/uploads/Screenshot-from-2018-09-09-19-18-31.png';
//        let resource = '<img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = '';

        let ref_link = 'https://www.geeksforgeeks.org/effect-of-bias-in-neural-network/'
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>'

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _inference() {
        let desc = 'Inference describes the process, to get a prediction for the input data once a network has been trained.';

        let resource_link = 'https://blogs.nvidia.com/wp-content/uploads/2016/08/ai_difference_between_deep_learning_training_inference.jpg';
//        let resource = '<br><img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = '';

        let ref_link = 'https://blogs.nvidia.com/blog/2016/08/22/difference-deep-learning-training-inference-ai/';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>'

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _cross_entropy_loss() {
        let desc = 'Cross-entropy loss, or log loss, measures the performance of a classification model whose output is a probability value between 0 and 1. Cross-entropy loss increases as the predicted probability diverges from the actual label. <br>'+
            'So predicting a probability of .012 when the actual observation label is 1 would be bad and result in a high loss value. A perfect model would have a log loss of 0.';

        let resource_link = 'https://ml-cheatsheet.readthedocs.io/en/latest/_images/cross_entropy.png';
//        let resource = '<br><img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = '';

        let ref_link = 'https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>'

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _gradient_descent() {
        let desc = 'Gradient descent is an optimization algorithm used to minimize some function by iteratively moving in the direction of steepest descent as defined by the negative of the gradient.<br>' + 
            'In machine learning, we use gradient descent to update the parameters of our model. Parameters refer to coefficients in Linear Regression and weights in neural networks.';

        let resource_link = 'https://ml-cheatsheet.readthedocs.io/en/latest/_images/gradient_descent.png';
//        let resource = '<br><img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = 'Starting at the top of the mountain, we take our first step downhill in the direction specified by the negative gradient. ' +
            'Next we recalculate the negative gradient (passing in the coordinates of our new point) and take another step in the direction it specifies. ' +
            'We continue this process iteratively until we get to the bottom of our graph, or to a point where we can no longer move downhill–a local minimum.' +
            _createImg("https://ml-cheatsheet.readthedocs.io/en/latest/_images/gradient_descent_demystified.png");

        let ref_link = 'https://ml-cheatsheet.readthedocs.io/en/latest/gradient_descent.html';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>'

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];

    }

    function _gradients() {
        let desc = 'Stores the gradients for the backpropagation.';

        let resource_link = 'https://sebastianraschka.com/images/faq/visual-backpropagation/backpropagation.png';
//        let resource = '<br><img src="' + resource_link + '"><br>';
        let resource = _createImg(resource_link);

        let additions = '';

        let ref_link = 'https://sebastianraschka.com/faq/docs/visual-backpropagation.html';
        let ref = '<br><a target="_blank" rel="noopener noreferrer" href="' + ref_link + '">Reference</a>'

        return [desc, desc + resource + additions + ref, [desc, resource_link, additions, ref, ref_link]];
        
    }
}
