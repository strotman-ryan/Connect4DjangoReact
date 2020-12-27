# chat/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/connect4/(?P<room_name>\w+)/$', consumers.Connect4Consumer.as_asgi()),
]