import React, { Component } from 'react'
import './dataset-metadata.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class extends Component {
  render () {
    const { dataset } = this.props
    if (!this.props.dataset) { return <div /> }

    const data = [{
      Field: "modified",
      Value: "value 1"
    },
    {
     Field: "some field",
     Value: "value 2"
    }
    ]

    // const data = Object.keys(dataset || {}).map((column) => {
    //   return { Field: column, Value: column}
    // })


    const columns = [{ Header: 'Field', accessor: 'Field', headerClassName: 'table-header'}, { Header: 'Value', accessor: 'Value', headerClassName: 'table-header'},  ]

    return (
      <div id='dataset-metadata'>
        <div className='header-container'>
          <div className='header-text-items'>
            <div className='metadata-header'>Additional Information</div>
            <div>TODO ADD LINK TO DOWNLOAD METADATA</div>
          </div>
        </div>
        <div id='dataset-metadata-table'>
          <ReactTable
            data = {data}
            columns={columns}
            defaultPageSize={50}
            style={{
              height: '400px'
            }}
            className='-striped -highlight'
            showPagination={false}
            sortable={false}
          />
        </div>
      </div>
    )
  }
}
