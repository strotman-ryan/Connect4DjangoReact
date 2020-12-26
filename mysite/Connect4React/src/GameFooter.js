import React from 'react'
import PlayerTurn from './PlayerTurn'
import Reset from './Reset'
import Winner from './Winner'

function GameFooter(props){
	return(
		<div>
			<PlayerTurn player = {props.player}/>
			<Reset resetHandler = {props.resetHandler}/>
			<Winner result = {props.result} />
		</div>
	)
}

export default GameFooter