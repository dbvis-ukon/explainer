from explainer.explainer_base import Explainer

import keras

import innvestigate
import innvestigate.utils as iutils
import innvestigate.utils.visualizations as ivis


class DeConvNetExplainer(Explainer):

    def __init__(self):
        self.explainer_name = 'DeConvNet'

    def explain_image_innvestigate(self, model, data):

        # Build the model
        model = keras.models.Model(inputs=model.inputs,
                                   outputs=model.outputs)
        model.compile(optimizer="adam", loss="categorical_crossentropy")

        model_wo_sm = iutils.keras.graph.model_wo_softmax(model)

        analyzer = innvestigate.create_analyzer('deconvnet',
                                                model_wo_sm)

        analysis = analyzer.analyze(data)
        analysis = iutils.postprocess_images(analysis,
                                             color_coding='BGRtoRGB',
                                             channels_first=False)

        analysis = ivis.gamma(analysis, minamp=0, gamma=0.95)
        analysis = ivis.heatmap(analysis)

        # analysis = ivis.graymap(analysis)

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

        if type == 'image':
            return self.explain_image_innvestigate(model, data)
