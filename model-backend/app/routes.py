from explainer.lrp_explainer.explainer_lrp import LRPExplainer
from explainer.lime_explainer.explainer_lime import LimeExplainer
from explainer.gradient_explainer.explainer_gradient import GradientExplainer
from explainer.deeplift_explainer.explainer_deeplift import DeepLiftExplainer
from explainer.saliency_explainer.explainer_saliency import SaliencyExplainer
from explainer.deconvnet_explainer.explainer_deconvnet import DeConvNetExplainer

from keras.applications.imagenet_utils import decode_predictions

from flask import Blueprint, render_template, request

from keras.models import model_from_json
from keras.utils import CustomObjectScope
from keras.initializers import glorot_uniform
from keras import backend as K

import traceback

import numpy as np

import json
import io
import sys

from flask import jsonify

routes = Blueprint('routes', __name__,
                   template_folder='templates',
                   static_folder='static')


@routes.route('/')
def home():
    return render_template('base.html')


# TODO: cache model and data
def get_explanation(explainer, params):

    fail_return_data = []
    try:
        # Clear tensorflow graph and session to reduce errors
        K.clear_session()

        # Change ImmutableDict to dict for easier access
        data = request.values.to_dict()

        # "Pointer" to dict sources
        weights = request.files['model']
        architecture = data['architecture']

        # Load weights for the network
        # Workaround if file descriptor is sent
        # Works for open and blob
        # First read data and store it temporarily
        # Close file descriptor or blob
        # Load it into new buffer
        new_data = weights.read()
        weights.close()
        new_data = io.BytesIO(new_data)

        # Load data to use
        # If it is only an image, change to array containing the image
        temp_data = np.array(json.loads(data['data']))
        if len(temp_data.shape) < 4:
            temp_data = np.expand_dims(temp_data, axis=0)
        data = temp_data
        fail_return_data = np.zeros(data.shape)
        print('Got Data',file=sys.stderr)

        # Model building
        # First load architecture and then load weights
        with CustomObjectScope({'GlorotUniform': glorot_uniform()}):
            model = model_from_json(architecture)
            layer_names = set()
            for layer in model.layers:
                while layer.name in layer_names:
                    layer.name = layer.name + '_'
                layer_names.add(layer.name)
            model.load_weights(new_data)
            # print(model.summary()) # summary to debug
            print('Created Model',file=sys.stderr)

            # Start explainer with set params and analyze input
            explain = explainer(**params)
            print('Use', explain.explainer_name)
            img = explain.explain(model, data, decode_predictions)
            print('Finished Explanation',file=sys.stderr)

            pred = model.predict(data)
            print('Finished Predictions',file=sys.stderr)

            return [img, pred]

    except ValueError:
        print("Value error:", sys.exc_info()[1],file=sys.stderr)
    except:
        print("Unexpected error:", sys.exc_info()[1],file=sys.stderr)
        # traceback.print_exc()

    return [fail_return_data[0], np.array([-1])]


@routes.route('/lrp', methods=['GET', 'POST'])
@routes.route('/lrp/<string:lrp_method>', methods=['GET', 'POST'])
@routes.route('/lrp/<string:lrp_method>/<int:epsilon>', methods=['GET', 'POST'])
def lrp(lrp_method='lrp.epsilon', epsilon=0.003):
    kwargs = {'lrp_method': lrp_method,
              'epsilon': epsilon}
    result = get_explanation(LRPExplainer, params=kwargs)
    return jsonify({'explanation': result[0].tolist(),
                    'prediction': result[1].tolist()})


@routes.route('/gradient', methods=['GET', 'POST'])
@routes.route('/gradient/<string:gradient_method>', methods=['GET', 'POST'])
def gradient(gradient_method='grad*input'):
    kwargs = {'gradient_method': gradient_method}
    result = get_explanation(GradientExplainer, params=kwargs)
    return jsonify({'explanation': result[0].tolist(),
                    'prediction': result[1].tolist()})


@routes.route('/lime', methods=['GET', 'POST'])
@routes.route('/lime/<int:num_samples>', methods=['GET', 'POST'])
@routes.route('/lime/<int:num_samples>/<int:top_labels>', methods=['GET', 'POST'])
@routes.route('/lime/<int:num_samples>/<int:top_labels>/<int:num_features>', methods=['GET', 'POST'])
def lime(num_samples=1000, top_labels=5, num_features=10):
    kwargs = {'num_samples': num_samples,
              'top_labels': top_labels,
              'num_features': num_features}
    result = get_explanation(LimeExplainer, params=kwargs)
    return jsonify({'explanation': result[0].tolist(),
                    'prediction': result[1].tolist()})


@routes.route('/deeplift', methods=['GET', 'POST'])
def deeplift():
    result = get_explanation(DeepLiftExplainer, params={})
    return jsonify({'explanation': result[0].tolist(),
                    'prediction': result[1].tolist()})


@routes.route('/saliency', methods=['GET', 'POST'])
def saliency():
    result = get_explanation(SaliencyExplainer, params={})
    return jsonify({'explanation': result[0].tolist(),
                    'prediction': result[1].tolist()})


@routes.route('/deconvnet', methods=['GET', 'POST'])
def deconvnet():
    result = get_explanation(DeConvNetExplainer, params={})
    return jsonify({'explanation': result[0].tolist(),
                    'prediction': result[1].tolist()})
