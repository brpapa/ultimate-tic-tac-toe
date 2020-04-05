import React, { useState } from 'react'
import styled from 'styled-components'

import Board from './Board'

// 1 Game  -> 9 Board
// 1 Board -> 9 Square
export default function Game(props) {
  const [boards, setBoards] = useState(new Array(9).fill(null)) // null, 'X', 'O' ou '#'
  const [currPlayer, setCurrPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [unlockedBoard, setUnlockedBoard] = useState(null) // null p/ todos desbloqueados

  return (
    <>
      <Label>{winner ? `${winner} won!` : `${currPlayer}'s turn`}</Label>
      <Container>
        <Row>{[0, 1, 2].map((b) => renderBoard(b))}</Row>
        <Row>{[3, 4, 5].map((b) => renderBoard(b))}</Row>
        <Row>{[6, 7, 8].map((b) => renderBoard(b))}</Row>
      </Container>
    </>
  )

  function renderBoard(b) {
    return (
      <Board
        key={b}
        currPlayer={currPlayer}
        onClick={(squares, s) => handleClickOnBoard(b, squares, s)}
        winner={boards[b]}
        blocked={(b !== unlockedBoard && unlockedBoard !== null)}
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
    setUnlockedBoard(newBoards[s] ? null : s)

    setBoards(newBoards)
  }

  function checkWinner(squares) {
    // prettier-ignore
    const winPossibilities = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
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

const Label = styled('h1')`
  text-align: center;
`
const Container = styled('div')`
`
const Row = styled('div')`
  display: flex;
`
