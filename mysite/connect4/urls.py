from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('startgame/', views.startGame, name='startGame'),
    path('game/<int:game_id>', views.game, name='game'),
]