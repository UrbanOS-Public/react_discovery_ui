import './dataset-visualization-view.scss'
import React from 'react'
import { Component } from 'react'
import sqlIcon from '../../assets/blk-database.svg'
import InlineSVG from 'react-svg-inline'

import DatasetQueryView from '../dataset-query-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import { Collapse } from 'react-collapse'
import LoadingElement from '../../components/generic-elements/loading-element'

export default class extends Component {
  constructor(props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.state = { open: false, dataSources: this.props.dataSources }
  }

  componentDidUpdate() {
    if (this.props.dataSources !== this.state.dataSources) {
      this.setState({ dataSources: this.props.dataSources })
    }
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  // componentDidUpdate(prevState) {

  //   // console.log(this.props)
  //   if (prevState.open) {
  //     this.setState({ open: true })
  //   }
  // }

  render() {
    if (this.props.isLoading && !this.props.queryData) {
      return (
        <dataset-visualization>
          <LoadingElement />
        </dataset-visualization>
      )
    }

    //do something on initial render to prevent axes from breaking?

    return (
      <dataset-visualization >
        <div className="visualization-header">
          <div className="header">
            <button className='button query-button' onClick={this.toggleOpen} >
              {this.state.open ? 'HIDE QUERY' : 'EDIT QUERY'}
              <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' />
            </button>
          </div>
          <Collapse isOpened={this.state.open}>
            <DatasetQueryView systemName={this.props.systemName} freestyleQueryText={this.props.freestyleQueryText} />
          </Collapse>
        </div>
        <ChartVisualization dataSources={this.state.dataSources} />
      </dataset-visualization >
    )
  }
}