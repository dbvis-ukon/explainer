from explainer.explainer_base import Explainer

from lime import lime_image, lime_tabular

from lime.wrappers.scikit_image import SegmentationAlgorithm

from skimage.segmentation import mark_boundaries

import numpy as np


class LimeExplainer(Explainer):

    def __init__(self, num_samples=1000, top_labels=5, num_features=10):
        self.top_labels = top_labels
        self.num_samples = num_samples
        self.num_features = num_features

        self.explainer_name = 'LIME'

    def explain_image(self, model, data, class_to_explain):
        explainer = lime_image.LimeImageExplainer()
        if data.shape[1] < 50:
            segmenter = SegmentationAlgorithm(
                'quickshift', kernel_size=1, max_dist=200, ratio=0.2)

            explanation = explainer.explain_instance(data[0],
                                                     model.predict,
                                                     top_labels=self.top_labels,
                                                     # hide_color=0,
                                                     num_samples=self.num_samples,
                                                     segmentation_fn=segmenter)

        else:
            explanation = explainer.explain_instance(data[0],
                                                     model.predict,
                                                     top_labels=self.top_labels,
                                                     # hide_color=0,
                                                     num_samples=self.num_samples)

        temp, mask = explanation.get_image_and_mask(class_to_explain,
                                                    positive_only=False,
                                                    num_features=self.num_features,
                                                    hide_rest=False)

        return mark_boundaries(temp / 2 + 0.5, mask)

    def explain(self, model, data, labels):

        type = 'image'
        # classifiy data type
        if len(data.shape) > 3:
            if data.shape[3] == 3:
                type = 'image'

        pred = model.predict(data)
        top_class = np.argmax(pred[0])

        if type == 'image':
            return self.explain_image(model, data, top_class)
