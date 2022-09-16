import { Component } from 'react'
import PersonIcon from '@material-ui/icons/Person'

export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <login-svgs-and-text>
        <PersonIcon className='user-icon' />
        <span>{this.props.text}</span>
        <span className='arrow'>{this.props.symbol}</span>
      </login-svgs-and-text>
    )
  }
}
