import InlineSVG from 'react-svg-inline'
import { Component } from 'react'
import arrow from '../../assets/ic_arrow.svg'
import user from '../../assets/user.svg'

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <login-svgs-and-text>
                <InlineSVG svg={user} className='user-icon' accessibilityDesc='User' />
                <span>{this.props.text}</span>
                <InlineSVG className='login-arrow' svg={arrow} accessibilityDesc='Arrow' />
            </login-svgs-and-text>
        )
    }
}
