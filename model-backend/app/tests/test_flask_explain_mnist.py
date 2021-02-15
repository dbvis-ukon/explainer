import requests
import numpy as np

import datetime

import matplotlib.pyplot as plt

from skimage.color import gray2rgb
from tensorflow.keras.datasets import mnist

import sys
sys.path.insert(0, './')


def main():

    networks = [['SMALL', 'small_architecture.json', 'small_mnist.h5'],
                ['CNN', 'cnn_architecture.json', 'cnn_mnist.h5']]

    (x_train, y_train), (x_test, y_test) = mnist.load_data()

    data_index = 111

    x = x_test.reshape(x_test.shape[0], 28, 28, 1)
    x = x.reshape((-1, 28, 28))
    x_org = gray2rgb(x[data_index])
    x = np.expand_dims(x_org, axis=0)
    x = x / 255

    y = y_test[data_index]

    for net in networks:

        with open('test_img/' + net[1], 'r') as f:
            architecture = f.read()

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
            print('Send data for', net[0], 'to technique', t)

            # recreate file descriptor
            files = {'model': open('test_img/' + net[2], 'rb')}

            request_url = url + t
            r = requests.post(url=request_url, data=data, files=files)

            response = r.json()
            img = np.array(response['explanation'])
            pred = response['prediction']
            technique_img.append([img, pred])

        fig, axes = plt.subplots(1, len(techniques)+1)
        axes[0].imshow(x_org)
        axes[0].set_title('Original ' + str(y))
        axes[0].get_xaxis().set_visible(False)
        axes[0].get_yaxis().set_visible(False)

        for i, t in enumerate(technique_img):
            axes[i+1].imshow(t[0])
            axes[i+1].set_title(techniques[i] + ' ' + str(np.argmax(t[1])))
            axes[i+1].get_xaxis().set_visible(False)
            axes[i+1].get_yaxis().set_visible(False)

        cur_time = datetime.datetime.today().strftime("%d-%m-%Y-%H-%M-%S")
        plt.subplots_adjust(right=5)
        plt.savefig('test_img/'+cur_time+'-'+net[0]+'-explanation.jpg',
                    bbox_inches='tight', pad_inches=1)


if __name__ == '__main__':
    main()
