import './search.scss'
import { Component, createRef } from 'react'
import Icon from '@material-ui/core/Icon'

const ENTER = 13

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { searchText: props.defaultText || '' }
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onClearClicked = this.onClearClicked.bind(this)
    this.searchBox = createRef()
  }

  render () {
    const clearButtonDisableClass = this.state.searchText ? '' : 'disabled'

    return (
      <search-box class={this.props.className}>
        <div className='search'>
          <Icon>search</Icon>
        </div>
        <input ref={this.searchBox} type='text' value={this.state.searchText} onKeyUp={this.onKeyUp} onChange={this.onChange} placeholder={this.props.placeholder} className='search-bar' />
        <div className={`clear ${clearButtonDisableClass}`}>
          <Icon className='clear-icon' onClick={this.onClearClicked}>clear</Icon>
        </div>
      </search-box>
    )
  }

  onChange (event) {
    this.setState({ searchText: event.target.value })
  }

  onKeyUp (event) {
    if (event.keyCode === ENTER) {
      this.props.callback(this.state.searchText)
    }
  }

  onClearClicked () {
    this.setState({ searchText: '' })
    
    // Shallow rendering does not play nice with refs
    if (this.searchBox.current) {
      this.searchBox.current.focus()
    }
  }
}
