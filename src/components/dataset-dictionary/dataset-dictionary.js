import React from 'react'
import './dataset-dictionary.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import CollapsableBox from '../../components/collapsable-box'

const expanderWidth = 35
const expandedArrow = '\u25BE'
const collapsedArrow = '\u25B8'

const renderTypeCell = schemaElement => (
  <div>
    {schemaElement.value === 'list'
      ? `list of ${schemaElement.original.listType}`
      : schemaElement.value}
  </div>
)

const isMap = schemaElement => {
  return schemaElement.type === 'map' || schemaElement.listType === 'map'
}

const renderExpander = ({ isExpanded, original: schemaElement }) => {
  var content = '';
  if (isMap(schemaElement)) {
    content = isExpanded ? expandedArrow : collapsedArrow
  }
  return <div className='expander'>{content}</div>
}

const renderSubTable = ({ original: schemaElement }) => {
  return isMap(schemaElement)
    ? <SchemaTable
      schema={schemaElement.subSchema}
      parentFieldName={schemaElement.name}
      style={{ marginLeft: `${expanderWidth}px` }} />
    : <span />
}

const columns = [
  {
    Header: 'Field', accessor: 'name', headerClassName: 'table-header', width: 240
  },
  {
    Header: 'Type', accessor: 'type', headerClassName: 'table-header', width: 120,
    Cell: renderTypeCell
  },
  { Header: 'Description', accessor: 'description', headerClassName: 'table-header' }
]

const SchemaTable = ({ schema, parentFieldName = '', style }) => {
  const classNames = `dataset-schema-table ${parentFieldName}`

  return (
    <div className={classNames}>
      <ReactTable
        style={style}
        data={schema}
        columns={columns}
        defaultPageSize={schema.length}
        className='-highlight'
        showPagination={false}
        sortable
        ExpanderComponent={renderExpander}
        SubComponent={renderSubTable}
        expanderDefaults={{ width: expanderWidth }}
      />
    </div>
  )
}

export default ({ schema, expanded = false }) => {
  var title = 'Data Dictionary'
  if (!schema) { title = title + ' Unavailable' }

  return (
    <CollapsableBox title={title} expanded={expanded}>
      <SchemaTable schema={schema} />
    </CollapsableBox>
  )
}
