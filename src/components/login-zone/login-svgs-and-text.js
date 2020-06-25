import { Component } from 'react'
import PersonIcon from '@material-ui/icons/Person'
import ArrowForwardIcon from '@material-ui/icons/ArrowRightAlt'

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <login-svgs-and-text>
                <PersonIcon className='user-icon' />
                <span className='logintext'>{this.props.text}</span>
            </login-svgs-and-text>
        )
    }
}
