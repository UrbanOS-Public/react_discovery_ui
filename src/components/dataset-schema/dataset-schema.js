import React, { Component } from 'react'
import './dataset-schema.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DatasetSchema from '.';


export default class extends Component {
  render() {
    const { schema, depth } = this.props
    if (!schema) {
      return <div />
    }

    const columns = [
      {
        Header: 'Field',
        accessor: 'name',
        headerClassName: 'table-header',
        width: 240
      },
      {
        Header: 'Type', accessor: 'type', width: 90, headerClassName: 'table-header',
        Cell: row => (
          <div>
            {row.value === 'list' ? `list of ${row.original.listType}` : row.value}
          </div>
        )
      },
      { Header: 'Description', accessor: 'description', headerClassName: 'table-header' }
    ]

    return (
      <div id='dataset-schema'>
        <div id='dataset-schema-table'>
          <ReactTable
            style={{ marginLeft: this.props.depth == 0 ? null : `35px`, borderLeft: '0px' }}
            data={schema}
            columns={columns}
            defaultPageSize={schema.length}
            className='-highlight'
            showPagination={false}
            sortable
            defaultSorted={[{ id: 'Field', desc: false }]}
            ExpanderComponent={({ isExpanded, original }) => {
              if (original.type === 'map' || original.listType === 'map') {
                return (
                  (isExpanded) ? <span> &#9662; </span> : <span> &#9656; </span>
                )
              } else {
                return (<span></span>)
              }
            }}
            SubComponent={({ original }) => {
              if (original.type === 'map' || original.listType === 'map') {
                return (
                  <DatasetSchema depth={this.props.depth + 1} schema={original.subSchema} style={{ borderLeft: '0px' }} />
                )
              }
              else {
                return <span></span>
              }
            }}
          />
        </div>
      </div >
    )
  }
}
