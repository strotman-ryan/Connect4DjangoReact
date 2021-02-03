
from django.http import HttpResponse
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
        print("good")
    else:
        #throw 404
    #make sure it is a post
    #create session id if not already have one
    #create game in db
    #Assign P1 or P2 to session Id just made
    #redirect to game with ID
    return redirect('game', game_id = gameNum)

def game(request, game_id):
    return render(request, "build/index.html", {'absoluteLink': request.build_absolute_uri(),
    'game_id': game_id})
