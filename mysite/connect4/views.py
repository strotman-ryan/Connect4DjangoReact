
from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
import random
from django.urls import reverse

# Create your views here.
def home(request):
    return render(request, 'connect4/index.html', {})

def setup(request):
    return render(request, 'connect4/setup.html')

def creategame(request):
    if request.method == 'POST':
        playerNum = request.POST['player'] #this is a string; either '1' or '2'
        session_id_string = 'session_id'
        #create session id if not already have one
        if not session_id_string in request.session:
            print('creating seesion_id')
            request.session[session_id_string] = 1
        else:
            print(request.session[session_id_string])
    else:
        raise Http404("Page not available")
    #create session id if not already have one
    #create game in db
    #Assign P1 or P2 to session Id just made
    #redirect to game with ID
    return redirect('game', game_id = gameNum)

def game(request, game_id):
    return render(request, "build/index.html", {'absoluteLink': request.build_absolute_uri(),
    'game_id': game_id})
