import React from 'react'
import Square from '../Square'
import './index.css'

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: new Array(9).fill(null) // 'X', 'O', '#'
    }
  }

  render() {
    const { winner, blocked } = this.props

    return (
      <div className='board-container'>
        <div className='board-line'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-line'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-line'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {(winner || blocked) ? (
          <button className='square-9' disabled={true}>
            {winner}
          </button>
        ) : null}
      </div>
    )
  }

  renderSquare(s) {
    const { winner, squares } = this.state
    return (
      <Square
        value={squares[s]}
        disabled={winner || squares[s]}
        onClick={() => {
          this.handleClickOnSquare(s) // quando Square for clicado, ele 'informa' Board, portanto Square é um controlled component
        }}
      />
    )
  }

  handleClickOnSquare(s) {
    this.setState((state) => {
      const squares = state.squares.slice() // copia os valores para garantir a imutabilidade
      squares[s] = this.props.currPlayer

      // define novo currPlayer em Game e checa se squares é vencedor
      this.props.onClick(squares, s)

      return { squares }
    })
  }
}
