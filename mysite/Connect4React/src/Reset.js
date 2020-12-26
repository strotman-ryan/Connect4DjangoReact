import React from 'react'

function Reset(props) {
	return(
		<button onClick = {() => props.resetHandler()}> Reset Game </button>
	)
}

export default Reset