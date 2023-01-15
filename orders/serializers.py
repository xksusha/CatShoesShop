from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):


    class Meta:
        model = OrderItem
        fields = ('id', 'paws',)


class OrderSerializer(serializers.ModelSerializer):

    order_items = serializers.SerializerMethodField()


    class Meta:
        model = Order
        fields = ('id', 'order_items', 'price',)

    def get_order_items(self, order):
        return OrderItemSerializer(order.order_items.all(), many=True).data

