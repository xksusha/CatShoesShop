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
        User.objects.create_user('temporary2', 'temporary2@gmail.com', 'temporary2')
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
        self.assertIn('price', request.data)
        self.assertEqual(request.data.get('price'), 0)

    def test_add_items_to_order(self):
        order, _ = Order.objects.get_or_create(user=User.objects.first())
        product = Product.objects.first()
        initial_qty = product.quantity
        ordered_qty = 4
        item = {
            'order_id': order.id,
            'paws': ordered_qty,
            'product_id': product.id,
        }
        token = Token.objects.get_or_create(user=User.objects.first())
        client.credentials(HTTP_AUTHORIZATION='Token ' + str(token[0]))
        request = client.put(reverse('order-detail', kwargs={ 'pk': order.id }), item, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertIn('order_items', request.data)
        order_items = request.data.get('order_items', [])
        self.assertEqual(1, len(order_items))
        self.assertEqual(request.data.get('price'), ordered_qty * product.price)
        product.refresh_from_db()
        self.assertEqual(product.quantity, initial_qty - ordered_qty)
        
    def test_list_orders(self):
        current_user = User.objects.first()
        other_user = User.objects.last()
        token = Token.objects.get_or_create(user=current_user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + str(token[0]))
        o1 = Order(user=current_user)
        o1.save()
        o2 = Order(user=other_user)
        o2.save()
        request = client.get(reverse('order-list'))
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertNotIn(o2.id, list(o['id'] for o in request.data))
        self.assertIn(o1.id, list(o['id'] for o in request.data))
