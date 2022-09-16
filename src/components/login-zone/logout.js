import { Component } from 'react'
import LoginSvgsAndText from './login-svgs-and-text'

export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <logout-component>
        <button
          onClick={this.props.logout}
        >
          <LoginSvgsAndText text='LOG OUT' />
        </button>
      </logout-component>
    )
  }
}
