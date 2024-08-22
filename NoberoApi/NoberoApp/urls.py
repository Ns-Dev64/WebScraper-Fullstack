from django.urls import path
from .views import ProductsApiView

urlpatterns = [
    path('products/', ProductsApiView.as_view()),
    path('products/<str:product_id>/', ProductsApiView.as_view(),),
]
