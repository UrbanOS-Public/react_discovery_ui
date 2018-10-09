import { Component } from 'react'
import './loading-element.scss'

export default class extends Component {
  render () {
    return (
      <loading-element>
        <div className='loading-container'>
          <img className='loader' src={'https://seeklogo.com/images/E/eevee-logo-D6A54F96A5-seeklogo.com.png'} alt='cool spinning evee icon' />
        </div>
      </loading-element>
    )
  }
}
