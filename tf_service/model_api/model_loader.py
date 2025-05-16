import tensorflow as tf
import os
import numpy as np

MULTICLASS_MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../best_multiclass.keras")
BINARY_MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../best_binary.keras")

try:
    multiclass_model = tf.keras.models.load_model(MULTICLASS_MODEL_PATH)
    print("Multiclass model loaded successfully")
except Exception as e:
    print(f"Error loading multiclass model: {e}")
    multiclass_model = None

try:
    binary_model = tf.keras.models.load_model(BINARY_MODEL_PATH)
    print("Binary model loaded successfully")
except Exception as e:
    print(f"Error loading binary model: {e}")
    binary_model = None

def preprocess_image(image):
    """Preprocess image for both models"""
    if len(image.shape) == 3 and image.shape[2] == 3:
        image = tf.image.rgb_to_grayscale(image)
    elif len(image.shape) == 3 and image.shape[2] != 1:
        image = tf.image.rgb_to_grayscale(image[:,:,:3])
    elif len(image.shape) == 2:
        image = tf.expand_dims(image, axis=-1)

    image = tf.image.resize(image, [256, 256])
    image = tf.expand_dims(image, axis=0)
    image = image / 255.0
    
    return image

def classify_image_multiclass(image):
    """Classify using the multiclass model"""
    if multiclass_model is None:
        raise ValueError("Multiclass model is not loaded")

    processed_image = preprocess_image(image)
    
    predictions = multiclass_model.predict(processed_image)
    class_labels = ["Lung Opacity", "Normal", "Pneumonia"]
    predicted_class = class_labels[np.argmax(predictions)]
    
    return {
        "predictions": predictions.tolist(),
        "predicted_class": predicted_class
    }

def classify_image_binary(image):
    """Classify using the binary model"""
    if binary_model is None:
        raise ValueError("Binary model is not loaded")

    processed_image = preprocess_image(image)
    
    prediction = binary_model.predict(processed_image)[0][0]
    predicted_class = "Disease" if prediction < 0.5 else "Normal"

    return {
        "predictions": [[1-prediction, prediction]],
        "predicted_class": predicted_class
    }

def classify_image(image, is_premium=False):
    """Classify image based on account type"""
    if is_premium:
        return classify_image_multiclass(image)
    else:
        return classify_image_binary(image)