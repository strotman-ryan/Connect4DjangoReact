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
    player1 = models.PositiveIntegerField(blank=True, null=True) #allows to set deautl to None
    player2 = models.PositiveIntegerField(blank=True, null=True)
    player1_connected = models.BooleanField(default=False)
    player2_connected = models.BooleanField(default=False)

    #try to do move in <column> with <player>
    # player is int 1 or 2
    # column is int 0-6
    #if successful return true
    #if not successful return false
    def TryMove(self, player, column):
        if IsTurn(self.game_state, player):
            columnValue = np.array(self.game_state[column])
            index = np.where(columnValue == 0)[0][-1] #TODO make sure cant overfill column
            columnValue[index] = player
            self.game_state[column] = columnValue.tolist()
            self.save()
            return True
        return False



