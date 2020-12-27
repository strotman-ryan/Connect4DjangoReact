import React from 'react';
import './App.css';
import Header from './Header'
import Game from './Game'
import { w3cwebsocket as W3CWebSocket } from "websocket";

//TODO: change the hard coded string
const game_id = document.getElementById('game_id').textContent;
const client = new W3CWebSocket('ws://127.0.0.1:8000/' + 'ws/connect4/' + game_id + '/');

class App extends React.Component {
  constructor(){
    super()
  }

  componentDidMount(){
    client.onopen = () => {
      console.log('Websocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }

  render(){
    return(
    <div className="App">
		<Header/>
		<Game/>
    </div>
    )
  }

}

export default App;
