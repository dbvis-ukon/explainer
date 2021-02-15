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

from explainer.deconvnet_explainer.explainer_deconvnet import DeConvNetExplainer


def main():

    inet_model = inception_v3.InceptionV3()

    url = 'https://pbs.twimg.com/profile_images/1046968391389589507/_0r5bQLl_400x400.jpg'
    response = requests.get(url)
    img_org = Image.open(BytesIO(response.content))
    img_org = img_org.resize((299, 299), Image.ANTIALIAS)

    x = image.img_to_array(img_org)
    x = np.expand_dims(x, axis=0)
    x = inception_v3.preprocess_input(x)

    explain = DeConvNetExplainer()
    img = explain.explain(inet_model, x, decode_predictions)

    plt.imshow(img)
    plt.show()


if __name__ == '__main__':
    main()
