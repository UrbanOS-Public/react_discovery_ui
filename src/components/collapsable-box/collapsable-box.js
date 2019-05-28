import './collapsable-box.scss'
import { Collapse } from 'react-collapse';
import { Component } from 'react'
import DetailToggleIcon from '../detail-toggle-icon';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: props.expanded || false };
  }

  toggleCollapsed() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    return (
      <collapsable-box>
        <div className='header-container' onClick={e => { this.toggleCollapsed() }} >
          <div className='header-text-items'>
            {this.props.headerHtml}
          </div>
          <DetailToggleIcon expanded={this.state.expanded} />
        </div>
        <Collapse isOpened={this.state.expanded}>
          {this.props.bodyHtml}
        </Collapse>
      </collapsable-box>
    )
  }
}
