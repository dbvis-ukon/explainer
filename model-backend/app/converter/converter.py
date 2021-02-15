
import tensorflow as tf


def convert_tensorflow_to_keras(tensorflow_model):

    PATH_REL_META = r'checkpoint1.meta'

    # start tensorflow session
    with tf.Session() as sess:

        # import graph
        saver = tf.train.import_meta_graph(PATH_REL_META)

        # load weights for graph
        saver.restore(sess, PATH_REL_META[:-5])

        # get all global variables (including model variables)
        vars_global = tf.global_variables()

        # get their name and value and put them into dictionary
        sess.as_default()
        model_vars = {}
        for var in vars_global:
            try:
                model_vars[var.name] = var.eval()
            except:
                print("For var={}, an exception occurred".format(var.name))
