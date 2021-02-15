from explainer.explainer_base import Explainer

import keras

from keras import backend as K

import innvestigate.utils as iutils
import innvestigate.utils.visualizations as ivis

from deepexplain.tensorflow import DeepExplain


class SaliencyExplainer(Explainer):

    def __init__(self):

        self.saliency_method = 'saliency'
        self.explainer_name = 'Saliency Maps'

    def explain_image_deepexplain(self, model, data, labels):

        with DeepExplain(session=K.get_session()) as de:
            model_wo_sm = iutils.keras.graph.model_wo_softmax(model)

            input_tensor = model_wo_sm.layers[0].input
            output_tensor = model_wo_sm.layers[-1].output

            fModel = keras.models.Model(inputs=input_tensor, outputs=output_tensor)
            target_tensor = fModel(input_tensor)

            attributions = de.explain(self.saliency_method, target_tensor * labels, input_tensor, data)

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
