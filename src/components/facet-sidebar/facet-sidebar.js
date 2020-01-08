import FacetList from '../facet-list'
import _ from 'lodash'
import './facet-sidebar.scss'
import { Component } from 'react'
import { Dialog } from '@material-ui/core'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dialogFacets: [],
      dialogTitle: '',
      showDialog: false
    }
  }

  render () {
    return (
      <div data-testid='facet-sidebar' className='facet-sidebar'>
        {_.map(this.props.availableFacets, (rawFacets, title) => {
          const facets = rawFacets.map((facet) => {
            const selected = _.get(this.props, `appliedFacets.${title}`, []).includes(facet.name)
            return Object.assign({}, facet, { selected })
          })

          return <FacetList
            facets={facets}
            title={title}
            clickHandler={(name) => this.clickHandler(title, name)}
            showMoreHandler={(title, facets) => this.showMoreHandler(title, facets)}
            limit={10}
            key={title}
          />
        })}
        <Dialog open={this.state.showDialog} onClose={() => { this.setState({ showDialog: false }) }} >
          <div data-testid='dialog-content' className='dialog-content'>
            <FacetList
              facets={this.state.dialogFacets}
              title={this.state.dialogTitle}
              clickHandler={(name) => this.clickHandler(this.state.dialogTitle, name)}
            />
          </div>
        </Dialog>
      </div>
    )
  }

  showMoreHandler (title, facets) {
    this.setState({
      dialogTitle: title,
      dialogFacets: facets,
      showDialog: true
    })
  }

  clickHandler (title, name) {
    this.props.clickHandler(title, name)
    this.setState({
      showDialog: false
    })
  }
}
