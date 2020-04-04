import React from 'react'
import styled from 'styled-components'

import Game from './Game'

// TODO: add adsense, para uma página poder receber adsense é preciso que haja algum conteudo textual nela (ideia: colocar conteudo abaixo da view port inicial (onde ficaria o game e anuncios))

// TODO: feat: player vs player (local)
// TODO: feat: player vs computer (local) - https://www.youtube.com/watch?v=trKjYdBASyQ - https://dev.to/nestedsoftware/tic-tac-toe-with-the-minimax-algorithm-5988 - https://www.freecodecamp.org/news/simple-chess-ai-step-by-step-1d55a9266977/

export default function App(props) {
  return (
    <Container>
      <Game />
    </Container>
  )
}

// TODO: tornar responsivo
const Container = styled('div')`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: 'Helvetica', Futura, sans-serif;
  --square-size: 65px; /* FIXME: qualquer mudança requer mudanças nas fontes dos botoes */
`
