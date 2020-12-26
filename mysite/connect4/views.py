
from django.http import HttpResponse
from django.shortcuts import render, redirect
import random
from django.urls import reverse

# Create your views here.
def index(request):
    return render(request, 'connect4/index.html', {})

def startGame(request):
    #TODO: have a way in increase the gameNum by one each time
    gameNum = random.randint(0, 1000) 
    return redirect('game', game_id = gameNum)

def game(request, game_id):
    return render(request, "build/index.html", {'absoluteLink': request.build_absolute_uri()})
