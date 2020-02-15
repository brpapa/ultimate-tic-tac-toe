import React from 'react'
import './index.css'

export default function Square({ value, disabled, onClick }) {
  return (
    <button className='square' disabled={disabled} onClick={onClick}>
      {value}
    </button>
  )
}
