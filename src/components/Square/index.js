import React from 'react'
import './styles.css'

export default function Square({ value, disabled, onClick }) {
  return (
    <button className='square' disabled={disabled} onClick={onClick}>
      {value}
    </button>
  )
}
