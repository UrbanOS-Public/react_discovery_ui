import './detail-toggle-icon.scss'
import { Component } from 'react'
import Icon from '@material-ui/core/Icon'

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <detail-toggle-icon >
                <Icon className="collapse-icon">
                    {this.props.expanded ? 'expand_less' : 'expand_more'}
                </Icon>
            </detail-toggle-icon>
        )
    }
}