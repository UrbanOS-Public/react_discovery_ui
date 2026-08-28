import React, { useState } from 'react'
import './dataset-dictionary.scss'
import { useReactTable, getCoreRowModel, getSortedRowModel, getExpandedRowModel, flexRender } from '@tanstack/react-table'
import CollapsableBox from '../../components/collapsable-box'
import Tooltip from '../tooltip'

const expanderWidth = 35
const expandedArrow = '\u25BE'
const collapsedArrow = '\u25B8'

const isMap = schemaElement => {
  return schemaElement.type === 'map' || schemaElement.itemType === 'map'
}

const schemaColumns = [
  {
    id: 'field',
    header: 'Field',
    accessorKey: 'name',
    meta: { headerClassName: 'table-header', className: 'field-name-cell' },
    size: 240,
    cell: ({ getValue, row }) => {
      const fieldName = getValue()
      const rowIsMap = isMap(row.original)
      const isExpanded = row.getIsExpanded()

      return (
        <div className='field-cell-content'>
          <Tooltip text={fieldName} />
          {rowIsMap && (
            <button
              type='button'
              className='field-expander-button'
              onClick={row.getToggleExpandedHandler()}
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${fieldName}`}
            >
              {isExpanded ? expandedArrow : collapsedArrow}
            </button>
          )}
        </div>
      )
    }
  },
  {
    id: 'type',
    header: 'Type',
    accessorKey: 'type',
    meta: { headerClassName: 'table-header' },
    size: 120,
    cell: ({ getValue, row }) => (
      <div>
        {getValue() === 'list'
          ? `list of ${row.original.itemType}`
          : getValue()}
      </div>
    )
  },
  {
    id: 'description',
    header: 'Description',
    accessorKey: 'description',
    meta: { headerClassName: 'table-header', className: 'description-cell' }
  }
]

const isEmpty = schema => !schema || schema.length < 1

const SchemaTable = ({ schema, parentFieldName = '', style }) => {
  const [sorting, setSorting] = useState([])
  const [expanded, setExpanded] = useState({})

  const table = useReactTable({
    data: schema,
    columns: schemaColumns,
    state: { sorting, expanded },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getRowCanExpand: row => isMap(row.original),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  })

  if (!schema) {
    return (
      <div className='error'>Schema information not found. Contact the data curator.</div>
    )
  }

  return (
    <div className={`dataset-schema-table ${parentFieldName}`} style={style}>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  aria-label={header.id}
                  scope='col'
                  className={header.column.columnDef.meta?.headerClassName || 'table-header'}
                  style={{ width: header.column.getSize() !== 150 ? `${header.column.getSize()}px` : undefined, cursor: header.column.getCanSort() ? 'pointer' : undefined }}
                  onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  aria-sort={header.column.getIsSorted() === 'asc' ? 'ascending' : header.column.getIsSorted() === 'desc' ? 'descending' : undefined}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className={cell.column.columnDef.meta?.className || ''}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={schemaColumns.length}>
                    <SchemaTable
                      schema={row.original.subSchema}
                      parentFieldName={row.original.name}
                      style={{ marginLeft: `${expanderWidth}px` }}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const viewLink = datasetId => (
  <div className='view-link'>
    <a
      href={`${window.DISC_API_URL}/api/v1/dataset/${datasetId}/dictionary`}
      target='_blank'
      role='link' rel='noreferrer'
    >
      <span className='view-text'>View as JSON</span>
    </a>
  </div>
)

export default ({ schema, datasetId, expanded = true }) => {
  let title = 'Data Dictionary'
  if (isEmpty(schema)) {
    title = title + ' Unavailable'
  }

  return (
    <dataset-dictionary class='dataset-dictionary'>
      <CollapsableBox title={title} expanded={expanded}>
        {!isEmpty(schema) && (
          <div>
            <SchemaTable schema={schema} />
            {viewLink(datasetId)}
          </div>
        )}
      </CollapsableBox>
    </dataset-dictionary>
  )
}
