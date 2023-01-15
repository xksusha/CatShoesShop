import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from products import models
from products.serializers import ProductSerializer


client = Client()
Product = models.Product

class ViewProductsTest(TestCase):

    def setUp(self):
        Product.objects.create(
            name='Hight Metal Heels', price=35, quantity=10, style=models.HEELS)
        Product.objects.create(
            name='Nike Air Cats', price=25, quantity=100, style=models.SNEAKERS)
        Product.objects.create(
            name='Uggs Paw Fur', price=25, quantity=0, style=models.BOOTS)

    def test_get_all_products(self):

        response = client.get(reverse('product-list'))
        products = Product.objects.filter(quantity__gt = 0).all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_omit_0_qty_products(self):

        product_to_omit = Product.objects.filter(quantity = 0).first()
        response = client.get(reverse('product-list'))
        self.assertNotIn(product_to_omit.id, list(p['id'] for p in response.data))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        