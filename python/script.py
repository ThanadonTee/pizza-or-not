import tensorflow as tf
import numpy as np

from tensorflow import keras
from sys import argv,stdout

class_names = ['not_pizza', 'pizza']

reconstructed_model = tf.keras.models.load_model('python/model.h5')

img = keras.preprocessing.image.load_img(
    'uploads/'+argv[1], target_size=(128, 128)
)
img_array = keras.preprocessing.image.img_to_array(img)
img_array = tf.expand_dims(img_array, 0) # Create a batch

predictions = reconstructed_model.predict(img_array)
score = tf.nn.softmax(predictions[0])
stdout.flush()
print(
    "{}-{:.2f}"
    .format(class_names[np.argmax(score)], 100 * np.max(score))
)