import React from 'react'
import PlayerTurn from './PlayerTurn'
import Column from './Column'
import GameFooter from './GameFooter'

function Game(props){
	const columns = props.board.map(col => 
		{
		return(
			<Column 
				value = {col} 
				key = {col.id} 
				clickHandler = {props.SendMove} 
			/>
		)});
	return(
		<div className = "board">
			{columns}
			<break/>
			<PlayerTurn player = {props.player}/>
	    </div>
	)
		
}


export default Game
