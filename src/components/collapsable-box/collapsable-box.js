import './collapsable-box.scss'
import { Collapse } from 'react-collapse';
import { Component } from 'react'
import DetailToggleIcon from '../detail-toggle-icon';

export default class extends Component {

  constructor(props) {
    super(props);
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    this.state = { expanded: isDesktop || props.expanded };
  }

  toggleCollapsed() {
    this.setState({ expanded: !this.state.expanded })
  }

  headerOpenClass() {
    return this.state.expanded ? 'open' : ''
  }

  render() {
    return (
      <collapsable-box>
        <div data-testid={this.props.testId} className={`header-container ${this.headerOpenClass()}`} onClick={e => { this.toggleCollapsed() }} >
          <div className='header-text-items'>
            <div className='title'>{this.props.title}</div>
            {this.props.headerHtml}
          </div>
          <DetailToggleIcon expanded={this.state.expanded} />
        </div>
        <Collapse isOpened={this.state.expanded}>
          {this.props.children}
        </Collapse>
      </collapsable-box>
    )
  }
}
