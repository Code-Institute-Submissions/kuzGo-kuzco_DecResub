# Generated by Django 3.2.8 on 2021-12-08 00:42

from django.db import migrations
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('checkout', '0003_auto_20211207_2238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='country',
            field=django_countries.fields.CountryField(
                max_length=2, null=True),
        ),
    ]
