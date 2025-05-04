import tensorflow as tf
import os
import numpy as np  # Import numpy

# Load the model once when the server starts
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../best_model_3classes.keras")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def classify_image(image):
    if model is None:
        raise ValueError("Model is not loaded")

    # Preprocess the image
    image = tf.image.resize(image, [224, 224])  # Resize to match model input
    image = tf.expand_dims(image, axis=0)       # Add batch dimension
    image = image / 255.0                       # Normalize pixel values

    # Make predictions
    predictions = model.predict(image)
    class_labels = ["Lung Opacity", "Normal", "Pneumonia"]  # Replace with your actual class labels
    predicted_class = class_labels[np.argmax(predictions)]  # Use np.argmax to get the index of the highest probability
    return {"predictions": predictions.tolist(), "predicted_class": predicted_class}