import React from 'react'
import Square from '../Square'
import './styles.css'

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
          {[0, 1, 2].map((s) => this.renderSquare(s))}
        </div>
        <div className='board-line'>
          {[3, 4, 5].map((s) => this.renderSquare(s))}
        </div>
        <div className='board-line'>
          {[6, 7, 8].map((s) => this.renderSquare(s))}
        </div>
        {(winner || blocked)? (
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
        disabled={squares[s] || winner}
        onClick={() => {
          this.handleClickOnSquare(s) // quando Square for clicado, ele 'informa' Board, portanto Square é um controlled component
        }}
      />
    )
  }

  handleClickOnSquare(s) {
    this.setState((state, props) => {
      const squares = state.squares.slice() // copia os valores para garantir a imutabilidade
      squares[s] = props.currPlayer

      // define novo currPlayer em Game e checa se squares é vencedor
      props.onClick(squares, s)

      return { squares }
    })
  }
}
