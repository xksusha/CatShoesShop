from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from drf_yasg.utils import swagger_auto_schema
from .models import Product
from .serializers import ProductSerializer

class ProductViews(ViewSet):
    queryset = Product.objects.filter(quantity__gt = 0).all()

    def list(self, request):
        serializer = ProductSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        product = get_object_or_404(self.queryset, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

