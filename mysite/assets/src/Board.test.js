import Board from './Board.js'
import React from 'react'

import { render} from '@testing-library/react';


test("Game test", () => {
    const newObj = render(<Board board = {[[0],[0],[0],[0]]}/>)
    expect(newObj.getByTestId('game').childNodes.length).toBe(4);
})

