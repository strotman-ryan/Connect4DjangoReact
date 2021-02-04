# chat/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Connect4Game

user_id_string = 'user_id'

class Connect4Consumer(WebsocketConsumer):

    def connect(self):  
        #get game_name     
        print(self.scope)
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        print(self.game_id)
        self.game_name = 'game_%s' % self.game_id #just string formatting

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.game_name,
            self.channel_name
        )

        #set up/get game
        game = Connect4Game.objects.get(pk = self.game_id)
        if game.player1 == self.scope['cookies'][user_id_string]:
            self.PlayerNum = 1 
        elif game.player2 == self.scope['cookies'][user_id_string]:
            self.PlayerNum = 2
        else:
            self.send({"close": True}) #closes the connection immediately

        
        self.accept()
        self._sendToClient()

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
        game = Connect4Game.objects.get(pk = self.game_id) 
        if not game.TryMove(player,column):
            print("Move was not allowed")
        async_to_sync(self.channel_layer.group_send)(
            self.game_name,
            {
                'type': 'move_message'
            }
        )

    # Receive message from other player
    def move_message(self, event):
        self._sendToClient()

    def _sendToClient(self):
        game = Connect4Game.objects.get(pk = self.game_id)
        gameToSend = {}
        gameToSend['board'] = game.game_state
        gameToSend['player'] = self.PlayerNum
        self.send(text_data=json.dumps(gameToSend))