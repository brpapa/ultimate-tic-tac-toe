import React, { useState } from 'react'
import styled from 'styled-components'

import Square from './Square'

export default function Board({ winner, blocked, currPlayer, onClick }) {
  //TODO: mover state para cima
  const [squares, setSquares] = useState(new Array(9).fill(null)) // null, 'X', 'O' ou '#'

  return (
    <Container>
      <Line>{[0, 1, 2].map((s) => renderSquare(s))}</Line>
      <Line>{[3, 4, 5].map((s) => renderSquare(s))}</Line>
      <Line>{[6, 7, 8].map((s) => renderSquare(s))}</Line>
      {winner || blocked ? <Button disabled={true}>{winner}</Button> : null}
    </Container>
  )

  function renderSquare(s) {
    return (
      <Square
        value={squares[s]}
        disabled={squares[s] || winner}
        onClick={() => {
          handleClickOnSquare(s) // quando Square for clicado, ele 'informa' Board, portanto Square é um controlled component
        }}
      />
    )
  }

  function handleClickOnSquare(s) {
    setSquares(() => {
      const newSquares = squares.slice() // copia os valores para garantir a imutabilidade
      newSquares[s] = currPlayer

      // define novo currPlayer em Game e checa se squares é vencedor
      onClick(newSquares, s)

      return newSquares
    })
  }
}

const Container = styled('div')`
  position: relative; /* pois é pai de .square-9 */
`
const Line = styled('div')`
  display: flex;
`
const Button = styled('button')`
  position: absolute;
  top: 0;
  left: 0;

  color: black;
  border: 1px solid #bbb;

  text-align: center;
  font-size: 160px;
  font-weight: 700;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  height: calc(3 * var(--square-size) - 2px);
  width: calc(3 * var(--square-size) - 2px);

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 1;
    cursor: default;
    background-color: rgba(255, 255, 255, 0.8);
  }
`
