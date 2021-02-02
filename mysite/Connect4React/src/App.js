import React from 'react';
import './App.css';
import Header from './Header'
import Game from './Game'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {IsTurn, IsWinner} from "./Connect4Utility.js"
import { isInaccessible } from '@testing-library/react';

//TODO: change the hard coded string
const game_id = document.getElementById('game_id').textContent;
const game_link = document.getElementById('game_link').textContent; //this should be like http://0.0.0.0:8000/connect/game/2
const client = new W3CWebSocket('ws://'+ window.location.host +'/ws/connect4/' + game_id + '/'); //need just ip address and port


class App extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.SendMove = this.SendMove.bind(this)
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('Websocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
      const dataFromServer = JSON.parse(message.data)
      this.setState({
        board : dataFromServer.board,
        player : dataFromServer.player
      })
    };
    client.onclose = () => {
      console.log('Websocket client disconnected');
    }
  }

  SendMove(id) {
    if(IsTurn(this.state.board, this.state.player) && IsWinner(this.state.board) == 0){
      client.send(JSON.stringify({
        'column': id,
        'player': this.state.player,
      }))
    } else {
      console.log("Not your turn");
    }
  }

  //TODO 
  render() {
    if (!this.state.board) {
      console.log("board is null");
      return <h1>waiting to connect</h1>
    }
    const isWinner = IsWinner(this.state.board);
    let text;
    if(isWinner === 0){
      if(IsTurn(this.state.board, this.state.player)){
        text = "Your Turn";
      }else{
        text = "Waiting for opponent...";
      }
    }else if(isWinner === this.state.player){
      text = "You won!!";
    }else if(isWinner === 3){
      text = "Tie. Play again?";
    }else{
      text = "You lose. Play again?";
    }
    return (
      <div className="app">
        <Header/>
        <Game
          board={this.state.board}
          player={this.state.player}
          SendMove={this.SendMove} />
        <p class="message"> {text} </p>
      </div>
    )
  }
}

export default App;
