import React from 'react'
import './dataset-dictionary.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import CollapsableBox from '../../components/collapsable-box'
import Tooltip from '../tooltip'

const expanderWidth = 35
const expandedArrow = '\u25BE'
const collapsedArrow = '\u25B8'

const renderFieldNameCell = schemaElement => (
  <Tooltip text={schemaElement.value} />
)

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
    Header: 'Field', accessor: 'name', headerClassName: 'table-header', width: 240,
    className: 'field-name-cell', Cell: renderFieldNameCell
  },
  {
    Header: 'Type', accessor: 'type', headerClassName: 'table-header', width: 120,
    Cell: renderTypeCell
  },
  {
    Header: 'Description', accessor: 'description', headerClassName: 'table-header',
    className: 'description-cell'
  }
]

const isEmpty = schema => !schema || schema.length < 1

const SchemaTable = ({ schema, parentFieldName = '', style }) => {
  return (
    <div className={`dataset-schema-table ${parentFieldName}`}>
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
  if (isEmpty(schema)) { title = title + ' Unavailable' }

  return (
    <dataset-dictionary>
      <CollapsableBox title={title} expanded={expanded}>
        {!isEmpty(schema) && <SchemaTable schema={schema} />}
      </CollapsableBox>
    </dataset-dictionary>
  )
}
