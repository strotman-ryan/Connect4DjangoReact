import React from 'react'
import Piece from './Piece'



function Column(props) {
	var key = 0
	const pieces = props.value.column.map(item => {
		key += 1
		return <Piece key = {key} value = {item}/>
	}
	)
	return(
		<div 
			className = "column" 
			onClick = {() => props.clickHandler(props.value.id	)}>
			{pieces}
		</div>
	)
}

export default Column