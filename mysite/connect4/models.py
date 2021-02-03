from django.db import models
import jsonfield
import numpy as np
from .Connect4Utility import IsTurn

PlayerKeyMaxLength = 50

class Connect4Game(models.Model):
    def initilizeBoard():
        #board is 6X7
        #the first index is col: 0 is left most row, 6 if right row
        #the second index is the row: 0 is the top row: 5 is the bottom row
        return [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],]


    game_state = models.JSONField(default =initilizeBoard)
    player1 = models.CharField(max_length=PlayerKeyMaxLength, default='')
    player2 = models.CharField(max_length=PlayerKeyMaxLength, default='')
    player1_connected = models.BooleanField(default=False)
    player2_connected = models.BooleanField(default=False)

    

class Connect4GameManager:
    '''
    game_state -> an instance of Connect4GameState
    game_id -> a unique id for a game for database lookups
    '''
    def __init__(self, game_id):
        self.game_id = game_id
        #try to get game from database
        try:
            game = Connect4Games.objects.get(game_id = self.game_id)
            self.game_state = Connect4GameState(game.game_state)
            self.player = 2
        except Connect4Games.DoesNotExist:
            self.game_state = Connect4GameState()
            game = Connect4Games(game_id = game_id, game_state = self.game_state.__dict__)
            game.save()
            self.player = 1


    #returns a Connect4GameStateObject
    def GetGameState(self):
        return self.game_state.__dict__

    def _SaveState(self):
        game = Connect4Games.objects.get(game_id = self.game_id)
        game.game_state = self.game_state.__dict__
        game.save()

    #try to do move in <column> with <player>
    #if successful return true
    #if not successful return false
    def TryMove(self, player, column):
        if IsTurn(self.game_state.board, player):
            columnValue = np.array(self.game_state.board[column])
            index = np.where(columnValue == 0)[0][-1]
            columnValue[index] = player
            self.game_state.board[column] = columnValue.tolist()
            self._SaveState()
            return True
        return False



class Connect4GameState:
    board = None

    def __init__(self, game_state = None):
        if game_state == None:
            self.InitlizeGame()
        else:
            self.board = game_state['board']

    def InitlizeGame(self):
        #board is 6X7
        #the first index is col: 0 is left most row, 6 if right row
        #the second index is the row: 0 is the top row: 5 is the bottom row
        self.board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],]
