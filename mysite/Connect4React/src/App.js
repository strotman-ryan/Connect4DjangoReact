import React from 'react';
import './App.css';
import Header from './Header'
import Game from './Game'
import { w3cwebsocket as W3CWebSocket } from "websocket";

//TODO: change the hard coded string
const game_id = document.getElementById('game_id').textContent;
const client = new W3CWebSocket('ws://127.0.0.1:8000/' + 'ws/connect4/' + game_id + '/');

const countNonZeros = (accumulator, currentValue) => accumulator  + (currentValue == 0 ? 0 : 1);
const sumReducer = (accumulator, currentValue) => accumulator + currentValue;

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
    console.log(this.state.board)
    let arrayOfSum = this.state.board.map(arr => arr.reduce(countNonZeros));
    console.log(arrayOfSum)
    let sum = arrayOfSum.reduce(sumReducer);
    console.log(sum)
    console.log(sum % 2 == this.state.player - 1)
    if(sum % 2 == this.state.player - 1){
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
    return (
      <div className="App">
        <Header />
        <Game
          board={this.state.board}
          player={this.state.player}
          SendMove={this.SendMove} />
      </div>
    )
  }
}

export default App;
