from django.db import models
from model_utils import Choices
from django.core.validators import MinValueValidator

BOOTS = 'Boots'
HEELS = 'Heels'
SHOES = 'Shoes'
SLIPPERS = 'Slippers'
SNEAKERS = 'Sneakers'

STYLE_CHOICES = Choices(
    (BOOTS, 'Cat Boots'),
    (HEELS, 'Cat Heels'),
    (SHOES, 'Generic Cat Shoes'),
    (SLIPPERS, 'Cat Slippers'),
    (SNEAKERS, 'Sneakers'),
)

class Product(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    style = models.CharField(choices=STYLE_CHOICES, max_length=150, default=SHOES)
    quantity = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])


    class Meta:
        ordering = ('-name',)


