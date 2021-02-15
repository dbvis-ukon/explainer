from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
from tensorflow import keras
import numpy as np
import random as rnd
import os
import shutil
import sys

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

import explainer_summary
import explainer_models

# Directory into which to write tensorboard data.
LOGDIR = '/tmp/explainer_logs'

def data_input_fn(batch_size=10):
    (train_images, train_labels), _ = keras.datasets.mnist.load_data()

    train_images = np.reshape(a=train_images,
                              newshape=[-1, 28, 28])
    train_labels = np.reshape(a=train_labels,
                              newshape=[-1, 1])

    def _train_data_gen():
        for (train_image, train_label) in zip(train_images, train_labels):
            train_image_rgb = np.stack((train_image,)*3, axis=-1)
            yield (train_image_rgb.astype(dtype=np.float64) / 255.0, train_label)

    train_dataset = tf.data.Dataset.from_generator(generator=_train_data_gen,
                                                   output_types=(tf.float64, tf.uint8),
                                                   output_shapes=([28, 28, 3],
                                                                  [1]))
    train_dataset = train_dataset.batch(batch_size=batch_size)

    return train_dataset.make_one_shot_iterator().get_next()


def inference_fn(inputs, model):
    with tf.name_scope("inference"):
        output = model(inputs)

    return output


def loss_fn(outputs, labels):
    losses = tf.losses.softmax_cross_entropy(onehot_labels=labels,
                                             logits=outputs)

    return tf.reduce_mean(input_tensor=losses)


def train_fn(inputs, labels, model):
    inputs = tf.reshape(tensor=inputs, shape=[-1, 28 * 28 * 3])

    labels = tf.one_hot(indices=labels, depth=10)
    labels = tf.reshape(tensor=labels, shape=[-1, 10])

    outputs = inference_fn(inputs, model)
    loss = loss_fn(outputs, labels)

    optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.03)
    minimize_op = optimizer.minimize(loss)

    summary_op = explainer_summary.full_graph("full_graph", tf.get_default_graph())

    return minimize_op, loss, summary_op


def main(_):
    # Remove remaining files from previous runs.
    for root, dirs, files in os.walk(LOGDIR):
        for file in files:
            os.remove(os.path.join(root, file))

    epochs = 2001

    nets = [[explainer_models.mnist_small, 'MNIST Dense'],
            [explainer_models.mnist_cnn, 'MNIST CNN']]

    for run in nets:
        run_logdir = LOGDIR + "/" + run[1]
        print('Saving output to %s.' % run_logdir)

        tf.reset_default_graph()

        (train_images, train_labels) = data_input_fn(batch_size=10)

        minimize_op, loss_op, summary_op = train_fn(train_images, train_labels, run[0])

        writer = tf.summary.FileWriter(run_logdir)
        writer.add_graph(tf.get_default_graph())

        with tf.Session() as sess:
            sess.run(tf.global_variables_initializer())

            for i in range(epochs):
                _, loss, summary = sess.run(fetches=[minimize_op, loss_op, summary_op])

                if i % 40 == 0:
                    writer.add_summary(summary, i)
                    print("Loss at step " + str(i) + ": " + str(loss))

        writer.close()
        print('Done. Output saved to %s.' % run_logdir)


if __name__ == '__main__':
    tf.app.run()
