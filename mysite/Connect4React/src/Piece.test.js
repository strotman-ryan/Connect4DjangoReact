import Piece from './Piece'
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'

test('Piece OnePlayerPiece', async () =>{
    const {getByTestId} = render(<Piece value={1}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("player-one-piece");
})


test('Piece TwoPlayerPiece', async () =>{
    const {getByTestId} = render(<Piece value={2}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("player-two-piece");
})

test('Piece EmptyPiece', async () =>{
    const {getByTestId} = render(<Piece value={0}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("open-piece");
})

test('Piece ThrowException', () =>{
    expect(() => render(<Piece value={3}/>)).toThrow("Value Not Handled");
})
