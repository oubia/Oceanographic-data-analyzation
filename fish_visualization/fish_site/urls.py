from django.urls import path
from . import views

urlpatterns = [
        path('',views.home),
        path('table/',views.TablePage,name="TablePage"),

]