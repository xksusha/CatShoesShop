from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product

User = get_user_model()


class Order(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='orders')

    class Meta:
        ordering = ('-created',)

    def price(self):
        return sum(item.total_price() for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    paws = models.PositiveIntegerField(default=4)


    def total_price(self):
        return self.product.price * self.paws