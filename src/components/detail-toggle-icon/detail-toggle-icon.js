import './detail-toggle-icon.scss'
import { Component } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <detail-toggle-icon >
                {this.props.expanded ? <ExpandLess className="collapse-icon" /> : <ExpandMore className="collapse-icon" />}
            </detail-toggle-icon>
        )
    }
}
