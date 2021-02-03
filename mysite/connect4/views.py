from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect, get_object_or_404
import random
from django.urls import reverse
from .models import Connect4Game
import random
from datetime import datetime

#Globals
random.seed(datetime.now())
session_id_string = 'session_id'

# Create your views here.
def home(request):
    return render(request, 'connect4/index.html', {})

def setup(request):
    return render(request, 'connect4/setup.html')

def creategame(request):
    if request.method == 'POST':
        playerNum = request.POST['player'] #this is a string; either '1' or '2'
        if playerNum not in ['1','2']:
            raise Http404("Page not available")      
        CreateAndAssignSessionId(request)
        game = Connect4Game()
        if playerNum == '1':
            game.player1 = request.session[session_id_string]
        if playerNum == '2':
            game.player2 = request.session[session_id_string]
        game.save()  
        return redirect('game', game_id = game.id)     
    else:
        raise Http404("Page not available")
    
'''
Check if session Id matches a player
if it does return game
if it does not and a player is still null -> assign player to session ID and return
else 404
'''
def game(request, game_id):
    game = get_object_or_404(Connect4Game, pk=game_id)   
    if session_id_string in request.session and request.session[session_id_string] in [game.player1, game.player2]:
        pass #just return the game number
    elif game.player1 is None:       
        CreateAndAssignSessionId(request)
        game.player1 = request.session[session_id_string]
    elif game.player2 is None:
        CreateAndAssignSessionId(request)
        game.player2 = request.session[session_id_string]
    else:
        #game is already full
        #TODO: allow spectators?
        raise Http404("Page not available")
    game.save()
    return render(request, "build/index.html", 
    {
        'absoluteLink': request.build_absolute_uri(),
        'game_id': game_id
    })

def CreateAndAssignSessionId(request):
    if session_id_string not in request.session:
        print('creating seesion_id')
        request.session[session_id_string] = random.randint(0,2147483647) #max number allowed in database
