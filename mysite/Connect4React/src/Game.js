import React from 'react'
import Column from './Column'
import GameFooter from './GameFooter'

class Game extends React.Component{
	constructor(){
		super()
		this.state = {
			board: [
				{
					column : [0,0,0,0,0,0],
					id : 1
				},
				{
					column : [0,0,0,0,0,0],
					id : 2
				},
				{
					column : [0,0,0,0,0,0],
					id : 3
				},
				{
					column : [0,0,0,0,0,0],
					id : 4
				},
				{
					column : [0,0,0,0,0,0],
					id : 5
				},
				{
					column : [0,0,0,0,0,0],
					id : 6
				},
				{
					column : [0,0,0,0,0,0],
					id : 7
				}
			],
			player : 1
		}
		this.columnClickedHandler = this.columnClickedHandler.bind(this)
		this.resetGameClickedHandler = this.resetGameClickedHandler.bind(this)
	}
	
	columnClickedHandler(id){
		var player = this.state.player
		const newState = this.state.board.map(col => {
			if (col.id === id){
				var noChange = true
				var index = col.column.length -1
				while(noChange){
					if(col.column[index] === 0){
						noChange = false
						col.column[index] = this.state.player
						player = this.state.player === 1 ? 2: 1
					}
					if(index < 0){
						noChange = false
					}
					index = index - 1
				}
			}
			return col
		}
		)
		this.setState(
			{
				board: newState,
				player : player
			}
		)
	}
	
	winner
	
	resetGameClickedHandler(){	
		const board = this.state.board.map(col =>{
			col.column = [0,0,0,0,0,0]
			return col
			}
		)
		this.setState(
			{
				board : board,
				player : 1
			}
			)
	}

	
	render(){
		const columns = this.state.board.map(col => 
			{
			return(
				<Column 
					value = {col} 
					key = {col.id} 
					clickHandler = {this.columnClickedHandler} 
				/>
			)
			}
		)
		return(
		<div className = "board">
			{columns}
			<br/>
			<GameFooter 
				player = {this.state.player} 
				resetHandler = {this.resetGameClickedHandler}
				/>
		</div>
		)
	}
}


export default Game
