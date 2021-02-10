import {IsWinner, IsColumnFull, CheckWinner, IsTurn} from './Connect4Utility.js'


test("Is Winner board Starting state", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    expect(IsWinner(board)).toBe(0);
})


test("IsWinner board Tie", () => {
    const board = [[1,1,1,2,2,2],[2,2,2,1,1,1],[1,1,1,2,2,2],[2,2,2,1,1,1],[1,1,1,2,2,2],[2,2,2,1,1,1],[1,1,1,2,2,2]];
    expect(IsWinner(board)).toBe(3);
})

test("IsWinner vertical pleyer 1 win", () => {
    const board = [[0,0,1,1,1,1],[0,0,0,0,0,0],[0,0,0,0,0,2],[0,0,0,0,0,2],[0,0,0,0,0,2],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    expect(IsWinner(board)).toBe(1);
})

test("IsWinner vertical pleyer 1 win top most row", () => {
    const board = [[1,1,1,1,0,0],[0,0,0,0,0,0],[0,0,0,0,0,2],[0,0,0,0,0,2],[0,0,0,0,0,2],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    expect(IsWinner(board)).toBe(1);
})

test("IsWinner vertical pleyer 2 win", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,2,2,2,2],[0,0,0,0,1,1],[0,0,0,0,1,1],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    expect(IsWinner(board)).toBe(2);
})

test("IsWinner vertical pleyer 2 win last column", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,1,1],[0,0,0,0,1,1],[0,0,0,0,0,0],[0,0,2,2,2,2]];
    expect(IsWinner(board)).toBe(2);
})

test("IsWinner horizontal player 1 win", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,1],[0,0,0,0,1,1],[0,0,0,0,1,1],[0,0,0,0,0,1],[0,0,1,2,2,2]];
    expect(IsWinner(board)).toBe(1);
})

test("IsWinner horizontal player 2 win", () => {
    const board = [[2,0,0,0,0,0],[2,0,0,0,0,0],[2,0,0,0,0,0],[2,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    expect(IsWinner(board)).toBe(2);
})

test("IsWinner downRIghtDiagonal player 1 win", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]];
    expect(IsWinner(board)).toBe(1);
})

test("IsWinner downRIghtDiagonal player 2 win", () => {
    const board = [[2,0,0,0,0,0],[0,2,0,0,0,0],[0,0,2,0,0,0],[0,0,0,2,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]];
    expect(IsWinner(board)).toBe(2);
})

test("IsWinner downRIghtDiagonal player 2 win lower", () => {
    const board = [[0,0,2,0,0,0],[0,0,0,2,0,0],[0,0,0,0,2,0],[0,0,0,0,0,2],[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]];
    expect(IsWinner(board)).toBe(2);
})

test("IsWinner downLeftDiagonal player 1 win", () => {
    const board = [[0,0,0,1,0,0],[0,0,1,0,0,0],[0,1,0,0,0,0],[1,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    expect(IsWinner(board)).toBe(1);
})

test("IsWinner downLeftDiagonal player 2 win", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,2],[0,0,0,0,2,0],[0,0,0,2,0,0],[0,0,2,0,0,0]];
    expect(IsWinner(board)).toBe(2);
})

test("IsTurn empty board player 1", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 1;
    expect(IsTurn(board, player)).toBe(true);
})

test("IsTurn middle column full player 1", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[2,1,2,1,2,1],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 1;
    expect(IsTurn(board, player)).toBe(true);
})

test("IsTurn middle column full player 2", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[2,1,2,1,2,1],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 2;
    expect(IsTurn(board, player)).toBe(false);
})

test("IsTurn middle column almost full player 1", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,2,1,2,1],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 1;
    expect(IsTurn(board, player)).toBe(false);
})

test("IsTurn middle column almost full player 2", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,2,1,2,1],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 2;
    expect(IsTurn(board, player)).toBe(true);
})

test("IsTurn empty board player 2", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 2;
    expect(IsTurn(board, player)).toBe(false);
})

test("IsTurn 3 moves in player 2", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,2,1],[0,0,0,0,0,1],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 2;
    expect(IsTurn(board, player)).toBe(true);
})

test("IsTurn 3 moves in player 1", () => {
    const board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,2,1],[0,0,0,0,0,1],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    const player = 1;
    expect(IsTurn(board, player)).toBe(false);
})

test("IsTurn last move in player 1", () => {
    const board = [[1,1,1,2,2,2],[2,2,2,1,1,1],[1,1,1,2,2,2],[0,2,2,1,1,1],[1,1,1,2,2,2],[2,2,2,1,1,1],[1,1,1,2,2,2]];
    const player = 1;
    expect(IsTurn(board, player)).toBe(false);
})

test("IsTurn last move in player 2", () => {
    const board = [[1,1,1,2,2,2],[2,2,2,1,1,1],[1,1,1,2,2,2],[0,2,2,1,1,1],[1,1,1,2,2,2],[2,2,2,1,1,1],[1,1,1,2,2,2]];
    const player = 2;
    expect(IsTurn(board, player)).toBe(true);
})


test("IsColumnFull column empty", () =>{
    expect(IsColumnFull([0,0,0,0])).toBe(false);
})

test("IsColumnFull column partially full", () => {
    expect(IsColumnFull([0,0,1,2])).toBe(false);
})

test("IsColumnFull column full", () => {
    expect(IsColumnFull([1,2,2,1])).toBe(true);
})

test("Check Winner empty", () => {
    expect(CheckWinner(0,0,0,0)).toBe(0);
})

test("Check Winner blocked no winner", ()=>{
    expect(CheckWinner(1,1,1,2)).toBe(0);
})

test("Check winner player 1 win", () => {
    expect(CheckWinner(1,1,1,1)).toBe(1);
})

test("CheckWinner player 2 win", () => {
    expect(CheckWinner(2,2,2,2)).toBe(2);
})