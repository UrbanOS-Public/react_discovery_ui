import React from 'react'
import './tooltip.scss'

export default ({text}) => (
  <span className='tooltip'>
    {text}
    <div className='tooltip-text'>{text}</div>
  </span>
)
