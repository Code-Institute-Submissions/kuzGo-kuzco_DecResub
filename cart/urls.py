"""
Provides URL path to the shopping cart page
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.shopping_cart, name='shopping_cart'),
    path('add/<item_id>', views.add_to_cart, name='add_to_cart'),
    path('update/<item_id>', views.update_cart, name='update_cart'),
    path('remove/<item_id>/', views.delete_item, name='delete_item'),
]
