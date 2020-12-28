# chat/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Connect4Games, Connect4GameState, Connect4GameManager

class Connect4Consumer(WebsocketConsumer):
    def connect(self):  
        #get game_name     
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.game_name = 'game_%s' % self.game_id

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.game_name,
            self.channel_name
        )
        game_manager = Connect4GameManager(self.game_id)
        self.accept()
        self.send(text_data=json.dumps(game_manager.GetGameState()))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_name,
            self.channel_name
        )

    #recieve message from websocket
    def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)
        column = text_data_json['column']
        player = text_data_json['player'] 
        game_manager = Connect4GameManager(self.game_id) 
        if game_manager.TryMove(player, column):           
            # Send message to players
            async_to_sync(self.channel_layer.group_send)(
                self.game_name,
                {
                    'type': 'move_message'
                }
            )


    # Receive message from other player
    def move_message(self, event):
        game_manager = Connect4GameManager(self.game_id)
        # Send message to WebSocket
        self.send(text_data=json.dumps(game_manager.GetGameState()))
