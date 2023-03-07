from django.urls import include, path
from rest_framework import routers
from . import views

# <DT> [chore] Should wrap it into a module
router = routers.SimpleRouter()
router.register(r'', views.OrderViews)
urlpatterns = router.urls
# </DT>