from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('startgame/', views.startGame, name='startGame'),
    path('game/<int:game_id>', views.game, name='game'),
]