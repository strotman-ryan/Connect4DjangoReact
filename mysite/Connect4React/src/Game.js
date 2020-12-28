import React from 'react'
import PlayerTurn from './PlayerTurn'
import Column from './Column'
import GameFooter from './GameFooter'

function Game(props){
	let counter = 0
	console.log(props.board)

	const columns = props.board.map(col => {
		counter += 1
		return(
			<Column 
				value = {col} 
				key = {counter} 
				colNum = {counter}
				clickHandler = {props.SendMove} 
			/>
		)
	});
	console.log(columns)
	return(
		<div className = "board">
			{columns}
			<break/>
			<PlayerTurn player = {props.player}/>
	    </div>
	)		
}


export default Game
