# Generated by Django 4.1.5 on 2023-01-15 13:16

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=150)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('style', models.CharField(choices=[('Boots', 'Cat Boots'), ('Heels', 'Cat Heels'), ('Shoes', 'Generic Cat Shoes'), ('Slippers', 'Cat Slippers'), ('Sneakers', 'Sneakers')], default='Shoes', max_length=150)),
                ('quantity', models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'ordering': ('-name',),
            },
        ),
    ]
