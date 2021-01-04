'''
input is a board
  7x6 or colxrow, python arrays
  0 -> empty
  1 -> player 1
  2 -> player 2

  output
  0 -> no winner
  1 -> player one wins
  2 -> player 2 wins
  3 -> tie
'''
def IsWinner(board):

    vertical = {
        "colStart": 0,
        "col": 7,
        "row": 3,
        "colIncrement": [0,0,0],
        "rowIncrement": [1,2,3]
    }

    horizontal = {
        "colStart": 0,
        "col": 4,
        "row": 6,
        "colIncrement": [1,2,3],
        "rowIncrement": [0,0,0]
    }
    downRightDiagonal = {
        "colStart": 0,
        "col": 4,
        "row": 3,
        "colIncrement": [1,2,3],
        "rowIncrement": [1,2,3]
    }

    downLeftDiagonal = {
        "colStart" : 3,
        "col": 7,
        "row": 3,
        "colIncrement": [-1,-2,-3],
        "rowIncrement": [1,2,3]
    }

    checks = [vertical, horizontal, downRightDiagonal, downLeftDiagonal]

    for check in checks:
        for col in range(check["colStart"], check["col"]):
            for row in range(check["row"]):
                possibleWinner = CheckWinner(
                    board[col][row],
                    board[col + check["colIncrement"][0]][row + check["rowIncrement"][0]],
                    board[col + check["colIncrement"][1]][row + check["rowIncrement"][1]],
                    board[col + check["colIncrement"][2]][row + check["rowIncrement"][2]])
                if possibleWinner != 0:
                    return possibleWinner
    #check if top row is  full
    isBoardFull = sum([1 if piece == 0 else 0 for piece in board[:][0]]) == 0
    if isBoardFull:
        return 3
    return 0
  
'''
checks if there is a winner for 4 consecitive pieces
    input -> pieces have 0,1,2
    returns   
    0 -> no winner
    1 -> player one wins
    2 -> player 2 wins
'''
def CheckWinner(firstPiece, secondPiece, thirdPiece, forthPiece):
    if(firstPiece == secondPiece and firstPiece == thirdPiece and firstPiece == forthPiece):
        return firstPiece
    return 0


'''
    determines if it is the player's turn or not
    input: normal connect 4 board defined above, player -> 1 or 2
    output: true if it is the players turn
'''
def IsTurn(board, player):
    numberOfPiecesOnBoard = 0
    for col in board:
        for piece in col:
            numberOfPiecesOnBoard += 1 if not(piece == 0) else 0        
    return numberOfPiecesOnBoard % 2 == player - 1