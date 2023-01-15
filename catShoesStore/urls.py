"""catShoesStore URL Configuration
"""
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.authtoken import views

schema_view = get_schema_view(
   openapi.Info(
      title="Cat Shoes Store API",
      default_version='v1'
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    re_path(r'^playground/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^docs/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api-token-auth/', views.obtain_auth_token),
    path('admin/', admin.site.urls),
    path('orders/', include('orders.urls')),
    path('products/', include('products.urls')),
]
