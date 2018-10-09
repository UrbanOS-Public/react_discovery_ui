import { Component } from 'react'
import './error-component.scss'

export default class extends Component {
  render () {
    return (
      <error-component>
        <div className='error-container'>
          <div className='error-text'>{this.props.errorText}</div>
        </div>
      </error-component>
    )
  }
}
