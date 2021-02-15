import requests
import numpy as np

from PIL import Image
from io import BytesIO

import matplotlib.pyplot as plt

from keras.applications import inception_v3
from keras.preprocessing import image
from keras.applications.imagenet_utils import decode_predictions

import sys
sys.path.insert(0, './')

from explainer.gradient_explainer.explainer_gradient import GradientExplainer


def main():

    inet_model = inception_v3.InceptionV3()

    url = 'https://pbs.twimg.com/profile_images/1046968391389589507/_0r5bQLl_400x400.jpg'
    response = requests.get(url)
    img_org = Image.open(BytesIO(response.content))

    x = image.img_to_array(img_org)
    x = np.expand_dims(x, axis=0)
    x = inception_v3.preprocess_input(x)

    gradient_methods_results = []

    gradient_methods = ['grad*input', 'intgrad',
                        'gradient', 'smoothgrad',
                        'input_t_gradient',
                        'integrated_gradients']

    for gradient in gradient_methods:
        explain = GradientExplainer(gradient)
        img = explain.explain(inet_model, x, decode_predictions)
        gradient_methods_results.append(img)

    gradient_methods_len = len(gradient_methods_results)
    fig, axes = plt.subplots(1, gradient_methods_len + 1)

    for i, img in enumerate(gradient_methods_results):
        if img is None:
            img = np.zeros(x.shape)[0]
        axes[i].imshow(img)
    axes[gradient_methods_len].imshow(img_org)

    fig.show()
    plt.show()


if __name__ == '__main__':
    main()
