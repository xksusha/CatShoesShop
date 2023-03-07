from django.urls import include, path
from rest_framework import routers
from . import views

# <DT> [chore] Should save to db and not compute
router = routers.SimpleRouter()
router.register(r'', views.OrderViews)
urlpatterns = router.urls
# </DT>