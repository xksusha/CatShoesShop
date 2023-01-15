import json
from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer

class OrderViews(GenericViewSet):
    queryset = Order.objects.filter().all()
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def create(self, request):
        order = Order(user=request.user)
        order.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk):
        data = json.loads(request.data)
        order = get_object_or_404(self.queryset, pk=pk)
        OrderItem(order=order, **data).save()
        order.refresh_from_db()
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        serializer = OrderSerializer(request.user.orders, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        product = get_object_or_404(self.queryset, pk=pk)
        if product.user != request.user:
            return HttpResponseForbidden()
        else:
            serializer = OrderSerializer(product)
            return Response(serializer.data)

