import React from 'react'
import PlayerTurn from './PlayerTurn'
import Column from './Column'
import GameFooter from './GameFooter'
import {IsTurn} from './Connect4Utility'

function Game(props){
	let counter = -1
	const columns = props.board.map(col => {
		counter += 1
		return(
			<Column 
				player = {props.player}
				isTurn = {IsTurn(props.board, props.player)}
				value = {col} 
				key = {counter} 
				colNum = {counter}
				clickHandler = {props.SendMove} 
			/>
		)
	});
	return(
		<div>
			<div className = "board" data-testid = "game">
				{columns}			
	    	</div>
			<PlayerTurn player = {props.player}/>
		</div>
	)		
}


export default Game
