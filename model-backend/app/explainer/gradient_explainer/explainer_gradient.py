from explainer.explainer_base import Explainer

import numpy as np

import keras

from keras import backend as K

import matplotlib.pyplot as plt

import innvestigate
import innvestigate.utils as iutils
import innvestigate.utils.visualizations as ivis

from deepexplain.tensorflow import DeepExplain


class GradientExplainer(Explainer):

    def __init__(self, gradient_method='grad*input'):
        gradient_methods = ['grad*input', 'intgrad',
                            'gradient', 'smoothgrad',
                            'input_t_gradient',
                            'integrated_gradients']

        self.gradient_method = 'grad*input'
        if gradient_method in gradient_methods:
            self.gradient_method = gradient_method

        self.explainer_name = 'Gradient'

    def explain_image_deepexplain(self, model, data, labels):

        with DeepExplain(session=K.get_session()) as de:
            model_wo_sm = iutils.keras.graph.model_wo_softmax(model)

            input_tensor = model_wo_sm.layers[0].input
            output_tensor = model_wo_sm.layers[-1].output

            fModel = keras.models.Model(
                inputs=input_tensor, outputs=output_tensor)
            target_tensor = fModel(input_tensor)

            attributions = de.explain(
                self.gradient_method, target_tensor * labels, input_tensor, data)

            analysis = attributions
            analysis = iutils.postprocess_images(analysis,
                                                 color_coding='BGRtoRGB',
                                                 channels_first=False)
            analysis = ivis.gamma(analysis, minamp=0, gamma=0.95)
            analysis = ivis.heatmap(analysis)

            return analysis[0]

    def explain_image_innvestigate(self, model, data):

        try:
            # Build the model
            model = keras.models.Model(inputs=model.inputs,
                                       outputs=model.outputs)
            model.compile(optimizer="adam", loss="categorical_crossentropy")

            model_wo_sm = iutils.keras.graph.model_wo_softmax(model)

            analyzer = innvestigate.create_analyzer(self.gradient_method,
                                                    model_wo_sm)
            analysis = analyzer.analyze(data)
            analysis = iutils.postprocess_images(analysis,
                                                 color_coding='BGRtoRGB',
                                                 channels_first=False)

            analysis = ivis.gamma(analysis, minamp=0, gamma=0.95)
            analysis = ivis.heatmap(analysis)

            return analysis[0]

        except innvestigate.NotAnalyzeableModelException:
            return None

        except Exception:
            return None

    def explain(self, model, data, labels):
        try:
            model.get_config()
        except:
            print('Not a Keras Model')
            return None

        print('Current Explanation Method:', self.gradient_method)

        type = 'image'
        # classifiy data type
        if len(data.shape) > 3:
            if data.shape[3] == 3:
                type = 'image'

        pred = model.predict(data)

        if type == 'image':
            if self.gradient_method == 'grad*input' or self.gradient_method == 'intgrad':
                return self.explain_image_deepexplain(model, data, pred)
            else:
                return self.explain_image_innvestigate(model, data)
