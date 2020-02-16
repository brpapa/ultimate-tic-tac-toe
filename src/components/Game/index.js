//! https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe

import React from 'react'
import Board from '../Board'
import './styles.css'

// 1 Game  -> 9 Board
// 1 Board -> 9 Square
export default class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      boards: new Array(9).fill(null), // 'X', 'O', '#'
      currPlayer: 'X',
      winner: null,
      boardFree: null // todos livres inicialmente
    }
  }

  render() {
    const { winner, currPlayer } = this.state
    return (
      <div>
        <h1>tic tac toe²</h1>
        <p>{winner ? `${winner} won!` : `${currPlayer}'s turn`}</p>
        <div className='game-container'>
          <div className='game-line'>
            {[0, 1, 2].map((b) => this.renderBoard(b))}
          </div>
          <div className='game-line'>
            {[3, 4, 5].map((b) => this.renderBoard(b))}
          </div>
          <div className='game-line'>
            {[6, 7, 8].map((b) => this.renderBoard(b))}
          </div>
        </div>
      </div>
    )
  }

  renderBoard(b) {
    const { currPlayer, boards, boardFree, winner } = this.state

    return (
      <Board
        currPlayer={currPlayer}
        onClick={(squares, s) => this.handleClickOnBoard(b, squares, s)}
        winner={boards[b]}
        blocked={(b !== boardFree && boardFree !== null) || winner}
      />
    )
  }

  handleClickOnBoard(b, squares, s) {
    // houve um clique em squares[s] dentro de boards[b]

    this.setState((state) => {
      if (state.winner) return

      const boards = state.boards.slice()
      boards[b] = this.checkWinner(squares)

      return {
        currPlayer: state.currPlayer === 'X' ? 'O' : 'X',
        boards: boards,
        winner: this.checkWinner(boards),
        boardFree: boards[s] ? null : s
      }
    })
  }

  checkWinner(squares) {
    const possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let possibility of possibilities) {
      const [a, b, c] = possibility
      const square = squares[a]
      if (
        square &&
        square !== '#' &&
        square === squares[b] &&
        square === squares[c]
      )
        return square
    }
    if (squares.every((s) => s != null)) return '#'
    return null
  }
}
