import json
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from orders import models
from products.models import Product
from orders.serializers import OrderSerializer


client = APIClient()
Order = models.Order
OrderItem = models.OrderItem
User = get_user_model()

class ViewOrdersTest(TestCase):

    def __init__(self, *args, **kwargs):
        super(ViewOrdersTest, self).__init__(*args, **kwargs)

    def setUp(self):

        User.objects.create_user('temporary', 'temporary@gmail.com', 'temporary')
        Product.objects.create(
            name='Hight Metal Heels', price=35, quantity=10)
        Product.objects.create(
            name='Hight Basket Heels', price=35, quantity=10)

    def test_create_an_order(self):
        token = Token.objects.get_or_create(user=User.objects.first())
        client.credentials(HTTP_AUTHORIZATION='Token ' + str(token[0]))
        request = client.post(reverse('order-list'))
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', request.data)

    def test_add_items_to_order(self):
        order, _ = Order.objects.get_or_create(user=User.objects.first())
        item = {
            'order_id': order.id,
            'paws': 4,
            'product_id': Product.objects.first().id,
        }
        token = Token.objects.get_or_create(user=User.objects.first())
        client.credentials(HTTP_AUTHORIZATION='Token ' + str(token[0]))
        request = client.put(reverse('order-detail', kwargs={ 'pk': order.id }), json.dumps(item), format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertIn('order_items', request.data)
        order_items = request.data.get('order_items', [])
        self.assertEqual(1, len(order_items))
        