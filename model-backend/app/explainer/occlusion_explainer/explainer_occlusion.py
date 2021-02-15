from explainer.explainer_base import Explainer

import numpy as np

import keras

from keras import backend as K

import innvestigate.utils as iutils
import innvestigate.utils.visualizations as ivis

from deepexplain.tensorflow import DeepExplain


class OcclusionExplainer(Explainer):

    def __init__(self, window_shape=(5, 5, 1), step=3):
        self.window_shape = window_shape
        self.step = step

        self.explainer_name = 'Occlusion'

    def explain_image(self, model, data, labels):

        with DeepExplain(session=K.get_session()) as de:
            model_wo_sm = iutils.keras.graph.model_wo_softmax(model)

            input_tensor = model_wo_sm.layers[0].input
            output_tensor = model_wo_sm.layers[-1].output

            fModel = keras.models.Model(inputs=input_tensor,
                                        outputs=output_tensor)
            target_tensor = fModel(input_tensor)

            attributions = de.explain('occlusion',
                                      target_tensor * labels,
                                      input_tensor,
                                      data,
                                      window_shape=self.window_shape,
                                      step=self.step)
            attributions = np.nan_to_num(attributions)

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
        if callable(labels):
            for x in labels(pred)[0]:
                print(x)

        if type == 'image':
            return self.explain_image(model, data, pred)
