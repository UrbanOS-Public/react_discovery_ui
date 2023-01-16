import React, { Component } from 'react'
import variables from '../../styles/variables.scss'
import './data-view.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ReactJson from 'react-json-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import _ from 'lodash'

export default class extends Component {
  constructor() {
    super()
    this.state = { index: 0 }
  }

  render() {
    const isGeojson = this.props.format == 'geojson'
    const cleanData = isGeojson ? undefined : this.getCleanData(this.props.data)
    const columns = this.props.columns.map((column) => {
      return { Header: column, id: column, accessor: (row) => row[column], headerClassName: 'table-header' }
    })

    return (
      <div id='data-view'>
        <Tabs
          selectedIndex={this.state.index}
          onSelect={tabIndex => this.setState({ index: tabIndex })}
        >
          <TabList className='header'>
            <span className='tab-area'>
              {!isGeojson && (<Tab data-testid='data-table'>Table</Tab>)}
              <Tab data-testid='data-json'>JSON</Tab>
            </span>
          </TabList>
          {!isGeojson && (
            <TabPanel>
              <div id='data-view-table'>
                <ReactTable
                  data={cleanData}
                  columns={columns}
                  loading={this.props.loading}
                  defaultPageSize={50}
                  style={{
                    height: '400px'
                  }}
                  className='-striped -highlight'
                  page={this.props.page}
                  onPageChange={this.props.onNextPageClicked}
                />
              </div>
            </TabPanel>
          )}
          <TabPanel>
            <div id='data-view-raw'>
              {this.renderJsonOrLoading(this.props.loading)}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  cleanseData(data) {
    if (!data.map) { return [] }
    return data.map(row => this.cleanseRow(row))
  }

  cleanseRow(row) {
    const deconstructedObject = Object.entries(row)
    const listOfKeyValues = deconstructedObject.map(field =>
      ({ [field[0]]: this.cleanseField(field[1]) })
    )
    const reconstructedObject = Object.assign({}, ...listOfKeyValues)

    return reconstructedObject
  }

  cleanseField(value) {
    if (typeof value === 'boolean') {
      return value.toString()
    } else if (_.isNull(value) || _.isNaN(value)) {
      return ''
    } else if (typeof value === 'object') {
      return JSON.stringify(value)
    } else {
      return value
    }
  }

  getCleanData(queryData) {
    return queryData ? this.cleanseData(queryData) : queryData
  }

  renderJsonOrLoading(isLoading) {
    if (isLoading) {
      return <LoadingElement className='spinner' />
    } else {
      return <ReactJson src={this.props.data} theme={this.getTheme()} collapsed={2} />
    }
  }

  getTheme() {
    // react-json-view uses the 'base16' theme structure:
    // https://github.com/chriskempson/base16/blob/master/styling.md
    return {
      base00: 'white', // Default Background
      base01: 'white', // Lighter Background
      base02: variables.headerGrey, // Null background
      base03: variables.almostBlack, // Null Text
      base04: variables.mediumGrey, // Item counts
      base05: variables.darkGrey, // Unused
      base06: variables.darkGrey, // Unused
      base07: variables.lightBlue, // Field names
      base08: variables.darkGrey, // Unused
      base09: variables.green, // Field values
      base0A: variables.darkGrey, // Unused
      base0B: variables.darkGrey, // Unused
      base0C: variables.darkGrey, // Unused
      base0D: variables.darkGrey, // Expanders
      base0E: variables.darkGrey, // Expanders
      base0F: variables.darkGrey // Expanders
    }
  }
}
