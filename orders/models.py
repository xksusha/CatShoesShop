from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from products.models import Product

User = get_user_model()

# <DT> [chore] Should wrap it into a module text
class Order(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='orders')

    class Meta:
        ordering = ('-created',)

    def price(self):
        return sum(item.total_price() for item in self.order_items.all())
# </DT>

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    paws = models.PositiveIntegerField(default=4)


    def total_price(self):
        return self.product.price * self.paws

@receiver(post_save, sender=OrderItem, dispatch_uid="update_product_qty")
def update_stock(sender, instance, **kwargs):
    instance.product.quantity -= instance.paws
    instance.product.save()