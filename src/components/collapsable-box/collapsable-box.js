import './collapsable-box.scss'
import variables from '../../styles/variables.scss'
import { Collapse } from 'react-collapse'
import { Children, cloneElement, Component, isValidElement } from 'react'
import DetailToggleIcon from '../detail-toggle-icon'

function extractText (node) {
  if (!node) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join(' ').trim()
  if (node.props && node.props.children) return extractText(node.props.children)
  return ''
}

export default class extends Component {
  constructor (props) {
    super(props)
    const isDesktop = window.matchMedia(variables.aboveMaxBreak).matches
    this.state = { expanded: isDesktop || props.expanded }
    const title = typeof this.props.title === 'string' || typeof this.props.title === 'number'
      ? String(this.props.title)
      : ''
    const normalizedTitle = title.replace(/\s+/g, '-').toLowerCase()
    this.contentId = `collapsable-box-content-${normalizedTitle || 'content'}`
  }

  toggleCollapsed () {
    this.setState({ expanded: !this.state.expanded })
  }

  headerOpenClass () {
    return this.state.expanded ? 'open' : ''
  }

  render () {
    const childrenWithContentId = Children.map(this.props.children, child => {
      if (!isValidElement(child)) return child
      return cloneElement(child, { contentId: this.contentId })
    })

    return (
      <div className={`collapsable-box ${this.props.className || ''}`}>
        <div
          data-testid={this.props.testId}
          className={`header-container ${this.headerOpenClass()}`}
          onClick={e => { this.toggleCollapsed() }}
          onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); this.toggleCollapsed() } }}
          role='button'
          tabIndex='0'
          aria-label={[this.props.title, extractText(this.props.headerHtml)].filter(Boolean).join(': ') || 'collapsable box'}
          aria-controls={this.contentId}
          aria-expanded={this.state.expanded}
        >
          <div className='header-text-items'>
            <div className='title'>{this.props.title}</div>
            {this.props.headerHtml}
          </div>
          <DetailToggleIcon expanded={this.state.expanded} />
        </div>
        <Collapse
          aria-hidden={!this.state.expanded}
          hidden={!this.state.expanded}
          isOpened={this.state.expanded}
        >
          <div id={this.contentId}>
            {childrenWithContentId}
          </div>
        </Collapse>
      </div>
    )
  }
}
