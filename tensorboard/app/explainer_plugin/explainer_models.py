import tensorflow as tf

def mnist_small(inputs):
    hidden = tf.layers.dense(name="dense_hidden",
                             inputs=inputs,
                             units=500,
                             activation=tf.nn.leaky_relu,
                             use_bias=True,
                             kernel_initializer=tf.initializers.glorot_normal,
                             bias_initializer=tf.initializers.zeros)

    outputs = tf.layers.dense(name="dense_out",
                             inputs=hidden,
                             units=10,
                             activation=tf.nn.leaky_relu,
                             use_bias=True,
                             kernel_initializer=tf.initializers.glorot_normal,
                             bias_initializer=tf.initializers.zeros)

    return outputs


def mnist_cnn(inputs):
    input_layer = tf.reshape(inputs, [-1, 28, 28, 3])

    # Convolutional Layer #1
    conv1 = tf.layers.conv2d(
          inputs=input_layer,
          filters=32,
          kernel_size=[5, 5],
          padding="same",
          activation=tf.nn.relu)

    # Pooling Layer #1
    pool1 = tf.layers.max_pooling2d(inputs=conv1, pool_size=[2, 2], strides=2)

    # Convolutional Layer #2 and Pooling Layer #2
    conv2 = tf.layers.conv2d(
          inputs=pool1,
          filters=64,
          kernel_size=[5, 5],
          padding="same",
          activation=tf.nn.relu)
    pool2 = tf.layers.max_pooling2d(inputs=conv2, pool_size=[2, 2], strides=2)

    # Dense Layer
    pool2_flat = tf.reshape(pool2, [-1, 7 * 7 * 64])
    dense = tf.layers.dense(inputs=pool2_flat, units=1024, activation=tf.nn.relu)
    dropout = tf.layers.dropout(inputs=dense, rate=0.4)

    # Logits Layer
    outputs = tf.layers.dense(inputs=dropout, units=10)

    return outputs
