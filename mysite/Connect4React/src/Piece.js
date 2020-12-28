import React from 'react'


function Piece(props){
	var classN
	switch(props.value){
		case 0:
			classN = "open-piece"
			break;
		case 1:
			classN = "player-one-piece"
			break;
		case 2:
			classN = "player-two-piece"
			break;
		default:
			throw "Value Not Handled"
	}
	
	classN += " piece"

	
	return(
		<div className = "boarder" >
			<div className = {classN} data-testid = "piece"/>
		</div>
			
		)
}

export default Piece