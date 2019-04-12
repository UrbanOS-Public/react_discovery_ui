import React, { Component } from 'react'
import './dataset-preview.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class extends Component {
  componentDidMount () {
    this.props.retrieveDatasetPreview(this.props.datasetId)
  }

  render () {
    const { datasetPreview } = this.props
    if (!this.props.datasetPreview) { return <div /> }

    const data = this.cleanseData(datasetPreview.data.slice(0, 50))
    const columns = Object.keys(datasetPreview.data[0] || {}).map((column) => {
      return { Header: column, accessor: column, headerClassName: 'table-header' }
    })

    return (
      <div id='dataset-preview'>
        <div className='header-container'>
          <div className='header-text-items'>
            <div className='preview-header'>Dataset Sample</div>
            <div>This only shows the first 50 rows, to view the entire dataset please download</div>
          </div>
          <a className='download-dataset' href={`${window.API_HOST}/api/v1/dataset/${this.props.datasetId}/download`}>Download Dataset</a>
        </div>
        <div id='dataset-preview-table'>
          <ReactTable
            data={data}
            columns={columns}
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

  cleanseData(data) {
    return data.map(row => this.cleanseRow(row))
  }

  cleanseRow(row) {
    const deconstructedObject = Object.entries(row)
    const listOfKeyValues = deconstructedObject.map(field =>
      ({[field[0]]: this.cleanseField(field[1])})
    )
    const reconstructedObject = Object.assign({}, ...listOfKeyValues)

    return reconstructedObject
  }

  cleanseField(value) {
    if (typeof value === "boolean") {
      return value.toString()
    }
    return value
  }
}
