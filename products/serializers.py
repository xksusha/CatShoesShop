from rest_framework import serializers
from .models import Product

# <DT> [chore] This should be moved as well
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        # <DT> [typing] Maybe improve typings
        model = Product
        # </DT>
        fields = ('id', 'name', 'price', 'style', 'quantity',)
# </DT>
