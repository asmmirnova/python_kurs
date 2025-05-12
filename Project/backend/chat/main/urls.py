from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login),
    path('signup', views.signup),
    path('check_login', views.check_login),
    path('users', views.users),
    path('select_chat', views.select_chat),
    path('save_message', views.save_message),
    path('exit', views.exit_user),
    path('current_user', views.current_user),
    path('delete_user', views.delete_user),
    path('', views.hello),
]
