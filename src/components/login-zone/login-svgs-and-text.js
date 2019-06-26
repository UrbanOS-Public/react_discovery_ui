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
                <InlineSVG className='user-icon' svg={user} height='inherit' accessibilityDesc='User' />
                {this.props.text}
                <InlineSVG className='login-arrow' svg={arrow} height='inherit' accessibilityDesc='Arrow' />
            </login-svgs-and-text>
        )
    }
}
