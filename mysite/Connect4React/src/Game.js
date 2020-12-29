import React from 'react'
import PlayerTurn from './PlayerTurn'
import Column from './Column'
import GameFooter from './GameFooter'

function Game(props){
	let counter = -1

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
	return(
		<div className = "board" data-testid = "game">
			{columns}
			<break/>
			<PlayerTurn player = {props.player}/>
	    </div>
	)		
}


export default Game
