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
    player1 = models.CharField(max_length = 100, default='')
    player2 = models.CharField(max_length = 100, default='')
    numPlayer1Connections = models.IntegerField(default=0)
    numPlayer2Connections = models.IntegerField(default=0) 

    #try to do move in <column> with <player>
    # player is int 1 or 2
    # column is int 0-6
    #if successful return true
    #if not successful return false
    def TryMove(self, player, column):
        if IsTurn(self.game_state, player):
            columnValue = self.game_state[column]
            index = -1
            for row in columnValue :
                if row == 0:
                    index += 1
            if index == -1:
                print('column full')
                return #column full
            columnValue[index] = player
            self.game_state[column] = columnValue
            self.save()
            return True
        return False



