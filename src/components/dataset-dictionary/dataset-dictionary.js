import React from 'react'
import './dataset-dictionary.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import CollapsableBox from '../../components/collapsable-box'

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

const SchemaTable = ({ schema, depth }) => {

  return (
    <div className='dataset-schema-table'>
      <ReactTable
        // style={{ marginLeft: depth == 0 ? null : `35px`, borderWidth: '1px 0 0' }}
        data={schema}
        columns={columns}
        defaultPageSize={schema.length}
        className='-highlight'
        showPagination={false}
      // sortable
      // defaultSorted={[{ id: 'Field', desc: false }]}
      // ExpanderComponent={({ isExpanded, original }) => {
      //   if (original.type === 'map' || original.listType === 'map') {
      //     return (
      //       (isExpanded) ? <span> &#9662; </span> : <span> &#9656; </span>
      //     )
      //   } else {
      //     return (<span></span>)
      //   }
      // }}
      // SubComponent={({ original }) => {
      //   if (original.type === 'map' || original.listType === 'map') {
      //     return (
      //       <SchemaTable depth={depth + 1} schema={original.subSchema} style={{ borderLeft: '0px' }} />
      //     )
      //   }
      //   else {
      //     return <span></span>
      //   }
      // }}
      />
    </div>
  )
}


export default ({ schema, expanded = false }) => {
  var title = "Data Dictionary"
  if (!schema) { title = title + " Unavailable" }

  return (
    <CollapsableBox title={title} expanded={expanded}>
      <SchemaTable depth={0} schema={schema} />
    </CollapsableBox>
  )
}
