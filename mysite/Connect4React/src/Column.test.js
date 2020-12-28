import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Column from './Column.js'
import { unmountComponentAtNode } from "react-dom";


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("Column size 4", () =>{
    const newObj = render(<Column value = {[0,0,0,0]}/>)
    expect(newObj.getByTestId('column').childNodes.length).toBe(4);

})

test("Column differnt values", () =>{
    const newObj = render(<Column value = {[1,1,1]}/>)
    expect(newObj.getByTestId('column').childNodes.length).toBe(3);
})

test("Column no value", () =>{
    const newObj = render(<Column value = {[]}/>)
    expect(newObj.getByTestId('column').childNodes.length).toBe(0);
})

test("Column value like normal", () =>{
    const newObj = render(<Column value = {[0,1,2,0,2,1]}/>)
    expect(newObj.getByTestId('column').childNodes.length).toBe(6);
})

test("Column call back function with value 1", () =>{
    const mockClickFunction = jest.fn();
    render(<Column clickHandler = {mockClickFunction} colNum = {1} value={[]}/>, container)
    const column = document.querySelector("[data-testid = column]")
    fireEvent.click(column)
    expect(mockClickFunction).toHaveBeenCalledWith(1);
    expect(mockClickFunction.mock.calls.length).toBe(1);
})

test("Column call back function with value 2", () =>{
    const mockClickFunction = jest.fn();
    render(<Column clickHandler = {mockClickFunction} colNum = {2} value={[]}/>, container)
    const column = document.querySelector("[data-testid = column]")
    fireEvent.click(column)
    expect(mockClickFunction).toHaveBeenCalledWith(2);
    expect(mockClickFunction.mock.calls.length).toBe(1);
})

test("Column call back function mulitple times", () =>{
    const mockClickFunction = jest.fn();
    render(<Column clickHandler = {mockClickFunction} colNum = {2} value={[]}/>, container)
    const column = document.querySelector("[data-testid = column]")
    fireEvent.click(column)
    fireEvent.click(column)
    fireEvent.click(column)
    expect(mockClickFunction).toHaveBeenCalledWith(2);
    expect(mockClickFunction.mock.calls.length).toBe(3);
})