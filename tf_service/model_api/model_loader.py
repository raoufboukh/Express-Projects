import tensorflow as tf
import os
import numpy as np

# Load the model once when the server starts
MODEL_PATH = os.path.join(os.path.dirname(__file__), "C:/Users/GE/Downloads/best_multiclass.keras")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def classify_image(image):
    if model is None:
        raise ValueError("Model is not loaded")

    # Convert to grayscale if it's RGB
    if len(image.shape) == 3 and image.shape[2] == 3:
        # Convert RGB to grayscale
        image = tf.image.rgb_to_grayscale(image)
    elif len(image.shape) == 3 and image.shape[2] != 1:
        # Handle other channel configurations
        image = tf.image.rgb_to_grayscale(image[:,:,:3])
    elif len(image.shape) == 2:
        # Add channel dimension if missing
        image = tf.expand_dims(image, axis=-1)

    # Preprocess the image
    image = tf.image.resize(image, [256, 256])  # Resize to match new model input size
    image = tf.expand_dims(image, axis=0)       # Add batch dimension
    image = image / 255.0                       # Normalize pixel values

    # Make predictions
    predictions = model.predict(image)
    class_labels = ["Lung Opacity", "Normal", "Pneumonia"]  # Make sure this order matches your training data
    predicted_class = class_labels[np.argmax(predictions)]
    
    return {"predictions": predictions.tolist(), "predicted_class": predicted_class}