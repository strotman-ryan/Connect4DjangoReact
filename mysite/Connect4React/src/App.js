import React from 'react';
import './App.css';
import Header from './Header'
import Game from './Game'
import { w3cwebsocket as W3CWebSocket } from "websocket";

//TODO: change the hard coded string
const game_id = document.getElementById('game_id').textContent;
const client = new W3CWebSocket('ws://127.0.0.1:8000/' + 'ws/connect4/' + game_id + '/');

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isTurn: true,
    }
    //TODO: calculate if really state or not
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
    if (this.state.isTurn) {
      client.send(JSON.stringify({
        'move': id,
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
    console.log(this.state.board)
    return (
      <div className="App">
        <Header />
        <Game
          board={this.state.board}
          player={this.state.player}
          callBack={this.SendMove} />
      </div>
    )
  }
}

export default App;
