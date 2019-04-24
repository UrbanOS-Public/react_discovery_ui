import React, { Component } from 'react'
import './dataset-preview.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class extends Component {
  componentDidMount () {
    this.props.retrieveDatasetPreview(this.props.datasetId)
  }

  render () {
    const { datasetPreview = { data: [], meta: { columns: [] }} } = this.props
    const data = this.cleanseData(datasetPreview.data.slice(0, 50))
    const columns = datasetPreview.meta.columns.map((column) => {
      return { Header: column, accessor: column, headerClassName: 'table-header' }
    })

    return (
      <div id='dataset-preview'>
        <div className='header-container'>
          <div className='header-text-items'>
            <div className='preview-header'>Dataset Sample</div>
            <div>This only shows the first 50 rows, to view the entire dataset please download</div>
          </div>
        </div>
        <div id='dataset-preview-table'>
          <ReactTable
            data={data}
            columns={columns}
            loading={this.props.previewLoading}
            defaultPageSize={50}
            style={{
              height: '400px'
            }}
            className='-striped -highlight'
          />
        </div>
      </div>
    )
  }

  cleanseData (data) {
    return data.map(row => this.cleanseRow(row))
  }

  cleanseRow (row) {
    const deconstructedObject = Object.entries(row)
    const listOfKeyValues = deconstructedObject.map(field =>
      ({ [field[0]]: this.cleanseField(field[1]) })
    )
    const reconstructedObject = Object.assign({}, ...listOfKeyValues)

    return reconstructedObject
  }

  cleanseField (value) {
    if (typeof value === 'boolean') {
      return value.toString()
    }
    return value
  }
}
