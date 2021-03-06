import Piece from './Piece'
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'



test('Piece OnePlayerPiece', () =>{
    const {getByTestId} = render(<Piece value={1}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("player-one-piece");
})


test('Piece TwoPlayerPiece', () =>{
    const {getByTestId} = render(<Piece value={2}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("player-two-piece");
})

test('Piece EmptyPiece', () =>{
    const {getByTestId} = render(<Piece value={0}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("open-piece");
})

test('Piece Possible 1 piece', () =>{
    const {getByTestId} = render(<Piece value={3}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("player-one-piece-possible");
})

test('Piece Possible 2 piece', () =>{
    const {getByTestId} = render(<Piece value={4}/>);
    expect(getByTestId("piece")).toHaveClass("piece");
    expect(getByTestId("piece")).toHaveClass("player-two-piece-possible");
})

test('Piece ThrowException', () =>{
    expect(() => render(<Piece value={5}/>)).toThrow("Value Not Handled");
})
