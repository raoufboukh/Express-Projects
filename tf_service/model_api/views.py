from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from PIL import Image
import numpy as np
from .model_loader import classify_image, classify_image_multiclass, classify_image_binary

class ClassifyImageView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES['image']
            
            is_premium = request.data.get('is_premium', 'false').lower() == 'true'

            image = Image.open(file)
            
            image_array = np.array(image)
            
            predictions = classify_image(image_array, is_premium)
            return Response({"predictions": predictions})
        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=500)

class ClassifyImageBinaryView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES['image']
            image = Image.open(file)
            image_array = np.array(image)
            predictions = classify_image_binary(image_array)
            return Response({"predictions": predictions})
        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=500)

class ClassifyImageMulticlassView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES['image']
            image = Image.open(file)
            image_array = np.array(image)
            predictions = classify_image_multiclass(image_array)
            return Response({"predictions": predictions})
        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=500)