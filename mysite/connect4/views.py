from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
import random
from django.urls import reverse
from .models import Connect4Game
import random
from datetime import datetime
random.seed(datetime.now())

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
        session_id_string = 'session_id'
        #create session id if not already have one
        if not session_id_string in request.session:
            print('creating seesion_id')
            request.session[session_id_string] = random.randint(0,2147483647) #max number allowed in database
        game = Connect4Game()
        if playerNum == '1':
            game.player1 = request.session[session_id_string]
        if playerNum == '2':
            game.player2 = request.session[session_id_string]
        game.save()       
    else:
        raise Http404("Page not available")
    #create session id if not already have one
    #create game in db
    #Assign P1 or P2 to session Id just made
    #redirect to game with ID
    return render(request, 'connect4/setup.html')
    #return redirect('game', game_id = gameNum)

def game(request, game_id):
    return render(request, "build/index.html", {'absoluteLink': request.build_absolute_uri(),
    'game_id': game_id})
