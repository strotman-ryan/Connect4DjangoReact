# chat/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer
import json

class Connect4Consumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        board = [
            {
                'id' : 1,
                'column' : [0,0,0,0,0,0],
            },
            {
                'id' : 2,
                'column': [0,0,0,0,0,0],
            }
        ]
        player = 1
        state = {
            'board': board,
            'player': player,
        }
        state_str = json.dumps(state)
        print(state_str)
        self.send(text_data=state_str)

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))