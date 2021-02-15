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

from explainer.lime_explainer.explainer_lime import LimeExplainer


def main():

    inet_model = inception_v3.InceptionV3()

    url = 'https://pbs.twimg.com/profile_images/1046968391389589507/_0r5bQLl_400x400.jpg'
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))

    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = inception_v3.preprocess_input(x)

    explain = LimeExplainer(500, 0, 10, 25)
    img = explain.explain(inet_model, x, decode_predictions)

    print(img)

    plt.imshow(img)
    plt.show()


if __name__ == '__main__':
    main()
