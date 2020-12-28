import React from 'react'
import Piece from './Piece'



function Column(props) {
	var key = 0
	const pieces = props.value.map(item => {
		key += 1
		return <Piece key = {key} value = {item}/>
	}
	)
	return(
		<div 
			className = "column" 
			onClick = {() => props.clickHandler(props.colNum)}>
			{pieces}
		</div>
	)
}

export default Column