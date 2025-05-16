import tensorflow as tf
import os
import numpy as np

# Load both models when the server starts
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
    image = tf.image.resize(image, [256, 256])  # Resize to match model input size
    image = tf.expand_dims(image, axis=0)       # Add batch dimension
    image = image / 255.0                       # Normalize pixel values
    
    return image

def classify_image_multiclass(image):
    """Classify using the multiclass model"""
    if multiclass_model is None:
        raise ValueError("Multiclass model is not loaded")

    # Preprocess the image
    processed_image = preprocess_image(image)
    
    # Make predictions
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

    # Preprocess the image
    processed_image = preprocess_image(image)
    
    # Make predictions
    prediction = binary_model.predict(processed_image)[0][0]
    predicted_class = "Disease" if prediction < 0.5 else "Normal"
    
    # Format in a similar way to multiclass for consistency
    return {
        "predictions": [[1-prediction, prediction]],  # [Normal probability, Disease probability]
        "predicted_class": predicted_class
    }

def classify_image(image, is_premium=False):
    """Classify image based on account type"""
    if is_premium:
        return classify_image_multiclass(image)
    else:
        return classify_image_binary(image)