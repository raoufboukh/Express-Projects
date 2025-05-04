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
            image = Image.open(file).convert('RGB')  # Ensure it's RGB
            image_array = np.array(image)

            # Classify the image
            predictions = classify_image(image_array)
            return Response({"predictions": predictions})
        except Exception as e:
            return Response({"error": str(e)}, status=500)