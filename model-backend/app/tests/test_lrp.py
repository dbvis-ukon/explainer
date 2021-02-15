import requests
import datetime
import numpy as np

from PIL import Image
from io import BytesIO

import matplotlib.pyplot as plt

from keras.applications import inception_v3
from keras.preprocessing import image
from keras.applications.imagenet_utils import decode_predictions

import sys
sys.path.insert(0, './')

from explainer.lrp_explainer.explainer_lrp import LRPExplainer


def main():

    inet_model = inception_v3.InceptionV3()

    url = 'https://pbs.twimg.com/profile_images/1046968391389589507/_0r5bQLl_400x400.jpg'
    response = requests.get(url)
    img_org = Image.open(BytesIO(response.content))
    img_org = img_org.resize((299, 299), Image.ANTIALIAS)

    x = image.img_to_array(img_org)
    x = np.expand_dims(x, axis=0)
    x = inception_v3.preprocess_input(x)

    lrp_methods_results = []

    lrp_methods = ['lrp.z', 'lrp.epsilon',
                   'lrp.sequential_preset_a_flat',
                   'lrp.sequential_preset_b_flat',
                   'elrp']

    for lrp in lrp_methods:
        explain = LRPExplainer(lrp)
        img = explain.explain(inet_model, x, decode_predictions)
        lrp_methods_results.append(img)

    lrp_methods_len = len(lrp_methods_results)
    fig, axes = plt.subplots(1, lrp_methods_len + 1)

    for i, img in enumerate(lrp_methods_results):
        axes[i].imshow(img)
    axes[lrp_methods_len].imshow(img_org)

    # fig.show()
    cur_time = datetime.datetime.today().strftime("%d-%m-%Y-%H-%M-%S")
    plt.savefig('tests/test_img/'+cur_time+'-lrp.jpg')


if __name__ == '__main__':
    main()
