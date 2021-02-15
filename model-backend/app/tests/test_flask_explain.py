import requests
import numpy as np

from PIL import Image
from io import BytesIO

import datetime

import matplotlib.pyplot as plt

from keras.applications import inception_v3
from keras.preprocessing import image

import sys
sys.path.insert(0, './')


def main():
    model = inception_v3.InceptionV3()

    url = 'https://pbs.twimg.com/profile_images/1046968391389589507/_0r5bQLl_400x400.jpg'
    response = requests.get(url)
    img_org = Image.open(BytesIO(response.content))
    img_org = img_org.resize((299, 299), Image.ANTIALIAS)

    x = image.img_to_array(img_org)
    x = np.expand_dims(x, axis=0)
    x = inception_v3.preprocess_input(x)

    architecture = model.to_json()

    model.save('/tmp/model.h5')

    url = 'http://127.0.0.1:5000/'
    data = {'architecture': architecture,
            'data': x.tolist()}

    techniques = ['gradient',
                  'saliency',
                  'deeplift',
                  'lrp',
                  'deconvnet',
                  'lime']

    technique_img = []
    for t in techniques:
        files = {'model': open('/tmp/model.h5', 'rb')}

        request_url = url + t
        print('Send data to technique', t)
        r = requests.post(url=request_url, data=data, files=files)

        response = r.json()
        img = np.array(response['explanation'])

        technique_img.append(img)

    fig, axes = plt.subplots(1, len(techniques)+1)
    axes[0].imshow(img_org)
    for i, t in enumerate(technique_img):
        axes[i+1].imshow(t)
    # cur_time = datetime.datetime.today().strftime("%d-%m-%Y-%H-%M-%S")
    # plt.savefig('tests/test_img/'+cur_time+'-explanation.jpg')
    plt.show()


if __name__ == '__main__':
    main()
