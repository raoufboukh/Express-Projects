from django.urls import path
from .views import ClassifyImageView, ClassifyImageBinaryView, ClassifyImageMulticlassView

urlpatterns = [
    path('classify/', ClassifyImageView.as_view()),
    path('classify/binary/', ClassifyImageBinaryView.as_view()),
    path('classify/multiclass/', ClassifyImageMulticlassView.as_view()),
]