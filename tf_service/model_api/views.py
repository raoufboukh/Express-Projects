from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from PIL import Image
import numpy as np
from .model_loader import classify_image

class ClassifyImageView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        try:
            # Get the uploaded image
            file = request.FILES['image']
            
            # Open the image - don't convert to RGB since we need grayscale
            image = Image.open(file)
            
            # Convert to numpy array
            image_array = np.array(image)
            
            # Classify the image
            predictions = classify_image(image_array)
            return Response({"predictions": predictions})
        except Exception as e:
            import traceback
            print(traceback.format_exc())  # Print detailed error info
            return Response({"error": str(e)}, status=500)