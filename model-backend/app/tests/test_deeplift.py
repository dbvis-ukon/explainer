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

from explainer.deeplift_explainer.explainer_deeplift import DeepLiftExplainer


def main():

    inet_model = inception_v3.InceptionV3()

    url = 'https://pbs.twimg.com/profile_images/1046968391389589507/_0r5bQLl_400x400.jpg'
    response = requests.get(url)
    img_org = Image.open(BytesIO(response.content))
    img_org = img_org.resize((299, 299), Image.ANTIALIAS)

    x = image.img_to_array(img_org)
    x = np.expand_dims(x, axis=0)
    x = inception_v3.preprocess_input(x)

    deeplift_methods_results = []

    deeplift_methods = ['deep_lift']

    for deeplift in deeplift_methods:
        explain = DeepLiftExplainer(deeplift)
        img = explain.explain(inet_model, x, decode_predictions)
        deeplift_methods_results.append(img)

    deeplift_methods_len = len(deeplift_methods_results)
    fig, axes = plt.subplots(1, deeplift_methods_len + 1)

    for i, img in enumerate(deeplift_methods_results):
        axes[i].imshow(img)
    axes[deeplift_methods_len].imshow(img_org)

    fig.show()
    plt.show()


if __name__ == '__main__':
    main()
