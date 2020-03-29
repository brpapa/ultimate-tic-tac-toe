//! https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe

// TODO: feat: you vs computer, https://www.youtube.com/watch?v=trKjYdBASyQ, https://dev.to/nestedsoftware/tic-tac-toe-with-the-minimax-algorithm-5988

// 1 Game  -> 9 Board
// 1 Board -> 9 Square

import React, { useState } from 'react'
import styled from 'styled-components'

import Board from './Board'

export default function Game(props) {
  const [boards, setBoards] = useState(new Array(9).fill(null)) // null, 'X', 'O' ou '#'
  const [currPlayer, setCurrPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [boardFree, setBoardFree] = useState(null) // todos livres inicialmente

  return (
    <>
      <Label>{winner ? `${winner} won!` : `${currPlayer}'s turn`}</Label>
      <Container>
        <Line>{[0, 1, 2].map((b) => renderBoard(b))}</Line>
        <Line>{[3, 4, 5].map((b) => renderBoard(b))}</Line>
        <Line>{[6, 7, 8].map((b) => renderBoard(b))}</Line>
      </Container>
    </>
  )

  function renderBoard(b) {
    return (
      <Board
        currPlayer={currPlayer}
        onClick={(squares, s) => handleClickOnBoard(b, squares, s)}
        winner={boards[b]}
        blocked={(b !== boardFree && boardFree !== null) || winner}
      />
    )
  }

  function handleClickOnBoard(b, squares, s) {
    // houve um clique em squares[s] dentro de boards[b]

    if (winner) return

    const newBoards = boards.slice()
    newBoards[b] = checkWinner(squares)

    setCurrPlayer(currPlayer === 'X' ? 'O' : 'X')
    setWinner(checkWinner(newBoards))
    setBoardFree(newBoards[s] ? null : s)

    setBoards(newBoards)
  }

  function checkWinner(squares) {
    const winPossibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (const [a, b, c] of winPossibilities) {
      if (
        (squares[a] === 'X' || squares[a] === 'O') &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      )
        return squares[a]
    }
    if (squares.every((s) => s != null)) return '#'
    return null
  }
}

const Label = styled('p')`
  text-align: center;
`
const Line = styled('div')`
  display: flex;
`
const Container = styled('div')``
