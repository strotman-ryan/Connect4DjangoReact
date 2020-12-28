import Piece from './Piece'
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'

test('Piece Test', async () =>{
    const {getByTestId} = render(<Piece value={1}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("player-one-piece");
})