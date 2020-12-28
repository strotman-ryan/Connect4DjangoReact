from django.db import models
import jsonfield
# Create your models here.


class Connect4Games(models.Model):
    game_id = models.CharField(max_length=20)
    game_state = jsonfield.JSONField()


class Connect4GameManager:
    '''
    game_state -> an instance of Connect4GameState
    game_id -> a unique id for a game for database lookups
    '''

    def __init__(self, game_id):
        self.game_id = game_id
        #try to get game from database
        try:
            game = Connect4Games.objects.get(game_id = game_id)
            self.game_state = Connect4GameState(game.game_state)
        except Connect4Games.DoesNotExist:
            self.game_state = Connect4GameState()
            game = Connect4Games(game_id = game_id, game_state = self.game_state.__dict__)
            game.save()


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
        #TODO add lots of checks
        self.game_state.board[0][column] = player
        self._SaveState()
        return true



class Connect4GameState:
    board = None
    isPlayerOneConnected = None
    isPlayerTwoConnected = None

    def __init__(self, game_state = None):
        if game_state == None:
            self.InitlizeGame()
        else:
            self.board = game_state['board']
            self.isPlayerOneConnected = game_state['isPlayerOneConnected']
            self.isPlayerTwoConnected = game_state['isPlayerTwoConnected']

    def InitlizeGame(self):
        self.isPlayerOneConnected = True
        self.isPlayerTwoConnected = False
        #board is 6X7
        #the first index is row: 0 is top row, 5 if bottom row
        #the second index is the col: 0 is the left most col: 6 is the right most row
        self.board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
