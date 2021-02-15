from explainer.explainer_base import Explainer

import numpy as np

import keras

from keras import backend as K

import matplotlib.pyplot as plt

import innvestigate
import innvestigate.utils as iutils
import innvestigate.utils.visualizations as ivis

from deepexplain.tensorflow import DeepExplain

class DeepLiftExplainer(Explainer):

    def __init__(self, deep_lift='deep_lift'):
        deep_lift_methods = ['deep_lift', 'deep_lift.wrapper']

        self.deep_lift_method = 'deep_lift'
        if deep_lift in deep_lift_methods:
            self.deep_lift_method = deep_lift

        self.explainer_name = 'DeepLift'

    def explain_image_innvestigate(self, model, data):

        # Build the model
        model = keras.models.Model(inputs=model.inputs,
                                   outputs=model.outputs)
        model.compile(optimizer="adam", loss="categorical_crossentropy")

        model_wo_sm = iutils.keras.graph.model_wo_softmax(model)

        analyzer = innvestigate.create_analyzer(self.deep_lift_method,
                                                model_wo_sm)
        analysis = analyzer.analyze(data)
        analysis = iutils.postprocess_images(analysis,
                                             color_coding='BGRtoRGB',
                                             channels_first=False)

        # analysis = ivis.gamma(analysis, minamp=0, gamma=0.95)
        # analysis = ivis.heatmap(analysis)

        return analysis[0]

    def explain_image_deepexplain(self, model, data, labels):

        with DeepExplain(session=K.get_session()) as de:
            model_wo_sm = iutils.keras.graph.model_wo_softmax(model)

            input_tensor = model_wo_sm.layers[0].input
            output_tensor = model_wo_sm.layers[-1].output

            fModel = keras.models.Model(inputs=input_tensor, outputs=output_tensor)
            target_tensor = fModel(input_tensor)

            attributions = de.explain('deeplift', target_tensor * labels, input_tensor, data)

            analysis = attributions
            analysis = iutils.postprocess_images(analysis,
                                                 color_coding='BGRtoRGB',
                                                 channels_first=False)
            analysis = ivis.gamma(analysis, minamp=0, gamma=0.95)
            analysis = ivis.heatmap(analysis)

            return analysis[0]


    def explain(self, model, data, labels):
        try:
            model.get_config()
        except:
            print('Not a Keras Model')
            return None

        type = 'image'
        # classifiy data type
        if len(data.shape) > 3:
            if data.shape[3] == 3:
                type = 'image'

        pred = model.predict(data)
        if type == 'image':
            # return self.explain_image_innvestigate(model, data)
            return self.explain_image_deepexplain(model, data, pred)
