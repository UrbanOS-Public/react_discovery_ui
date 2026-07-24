import React, { useMemo, useState, useEffect, useRef } from 'react'
import variables from '../../styles/variables.scss'
import './data-view.scss'
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import ReactJson from 'react-json-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import _ from 'lodash'

const DataTable = ({ data, columns, page, onNextPageClicked, datasetName }) => {
  const [pagination, setPagination] = useState({ pageIndex: page || 0, pageSize: 50 })
  const [columnSizing, setColumnSizing] = useState({})
  const totalRowsRef = useRef(1)
  const totalColsRef = useRef(columns.length)
  const tableRef = useRef(null)

  // Stable per-instance prefix so header IDs are unique if multiple tables are on the page
  const tableId = useRef(`dv-${Math.random().toString(36).slice(2, 7)}`).current
  const colHeaderId = (colIndex) => `${tableId}-col-${colIndex}`
  const rowHeaderId = (rowIndex) => `${tableId}-row-${rowIndex}`
  const dataCellId = (rowIndex, colIndex) => `${tableId}-cell-${rowIndex}-${colIndex}`

  // aria-activedescendant: track currently active cell by ID
  const [activeCellId, setActiveCellId] = useState(colHeaderId(0))
  const activeCellIdRef = useRef(colHeaderId(0))

  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: page || 0 }))
  }, [page])

  const table = useReactTable({
    data: data || [],
    columns,
    state: { pagination, columnSizing },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newPagination)
      if (onNextPageClicked) {
        onNextPageClicked(newPagination.pageIndex)
      }
    },
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  // Keep refs current on every render so the native keydown handler always sees fresh values
  totalRowsRef.current = table.getRowModel().rows.length + 1 // row 0 = header
  totalColsRef.current = columns.length

  // Resolve cell ID from (row, col) coordinates — row 0 = header, rows 1+ = data rows
  const resolveId = (row, col) => {
    if (row === 0) return colHeaderId(col)
    const dataRowIndex = row - 1
    return col === 0 ? rowHeaderId(dataRowIndex) : dataCellId(dataRowIndex, col)
  }

  // Parse (row, col) from a cell element's data attributes
  const parseCoords = (el) => {
    const row = parseInt(el.getAttribute('data-row'), 10)
    const col = parseInt(el.getAttribute('data-col'), 10)
    return isNaN(row) || isNaN(col) ? null : { row, col }
  }

  const activateCell = (row, col) => {
    const id = resolveId(row, col)
    activeCellIdRef.current = id
    setActiveCellId(id)
    const tableEl = tableRef.current
    if (!tableEl) return
    const cell = tableEl.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    if (cell) {
      cell.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }

  // Native keydown listener on the table container — reliable preventDefault for arrow keys
  useEffect(() => {
    const tableEl = tableRef.current
    if (!tableEl) return

    const handleKeyDown = (e) => {
      // Parse current coords from active cell ID via DOM lookup
      const activeEl = tableEl.querySelector(`#${CSS.escape(activeCellIdRef.current)}`)
      const coords = activeEl ? parseCoords(activeEl) : { row: 0, col: 0 }
      const { row, col } = coords || { row: 0, col: 0 }

      const moves = {
        ArrowUp: [row - 1, col],
        ArrowDown: [row + 1, col],
        ArrowLeft: [row, col - 1],
        ArrowRight: [row, col + 1]
      }
      if (!moves[e.key]) return
      e.preventDefault()
      const r = Math.max(0, Math.min(totalRowsRef.current - 1, moves[e.key][0]))
      const c = Math.max(0, Math.min(totalColsRef.current - 1, moves[e.key][1]))
      activateCell(r, c)
    }

    tableEl.addEventListener('keydown', handleKeyDown)
    return () => tableEl.removeEventListener('keydown', handleKeyDown)
  }, []) // empty deps — all values accessed via refs or DOM

  // Click-to-activate via event delegation on the table
  const handleTableClick = (e) => {
    const cell = e.target.closest('[data-row][data-col]')
    if (!cell) return
    const coords = parseCoords(cell)
    if (coords) activateCell(coords.row, coords.col)
  }

  const dataRows = table.getRowModel().rows

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <table
        ref={tableRef}
        tabIndex={0}
        style={{ width: table.getTotalSize() == 0 ? '100%' : table.getTotalSize() }}
        onClick={handleTableClick}
      >
        <caption>{datasetName ? `${datasetName} Dataset Preview` : 'Dataset Preview'}</caption>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, colIndex) => (
                <th
                  key={header.id}
                  id={colHeaderId(colIndex)}
                  scope='col'
                  data-row={0}
                  data-col={colIndex}
                  className={`${header.column.columnDef.meta?.headerClassName || 'table-header'}${activeCellId === colHeaderId(colIndex) ? ' active-cell' : ''}`}
                  style={{ width: header.getSize(), position: 'relative' }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanResize() && (
                    <div
                      className={`resizer${header.column.getIsResizing() ? ' isResizing' : ''}`}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      aria-hidden='true'
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {dataRows.length === 0
            ? (
              <tr>
                <td colSpan={Math.max(columns.length, 1)} className='no-data-message'>No rows found</td>
              </tr>
              )
            : dataRows.map((row, rowIndex) => {
              const tableRow = rowIndex + 1
              return (
                <tr key={row.id} className={rowIndex % 2 === 0 ? 'striped-row' : ''}>
                  {row.getVisibleCells().map((cell, colIndex) => {
                    const content = flexRender(cell.column.columnDef.cell, cell.getContext())
                    return colIndex === 0
                      ? (
                        <th
                          key={cell.id}
                          id={rowHeaderId(rowIndex)}
                          scope='row'
                          headers={colHeaderId(0)}
                          data-row={tableRow}
                          data-col={colIndex}
                          className={`row-header${activeCellId === rowHeaderId(rowIndex) ? ' active-cell' : ''}`}
                        >{content}
                        </th>
                        )
                      : (
                        <td
                          key={cell.id}
                          id={dataCellId(rowIndex, colIndex)}
                          headers={`${colHeaderId(colIndex)} ${rowHeaderId(rowIndex)}`}
                          data-row={tableRow}
                          data-col={colIndex}
                          className={activeCellId === dataCellId(rowIndex, colIndex) ? 'active-cell' : undefined}
                        >{content}
                        </td>
                        )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label='Previous page'
        >
          {'<'}
        </button>
        <span>
          Page{' '}
          <input
            data-testid='page-number-input'
            value={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const pageNum = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(pageNum)
            }}
            style={{ width: '3rem' }}
          />
          {' '}of{' '}
          <span data-testid='total-pages'>{table.getPageCount()}</span>
        </span>
        <button
          data-testid='next-page-button'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label='Next page'
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

const getTheme = () => ({
  // react-json-view uses the 'base16' theme structure:
  // https://github.com/chriskempson/base16/blob/master/styling.md
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
})

const cleanseField = (value) => {
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

const cleanseRow = (row) => {
  const reconstructedObject = Object.assign(
    {},
    ...Object.entries(row).map(([k, v]) => ({ [k]: cleanseField(v) }))
  )
  return reconstructedObject
}

const cleanseData = (data) => {
  if (!data || !data.map) return []
  return data.map(row => cleanseRow(row))
}

export default (props) => {
  const [index, setIndex] = useState(0)
  const isGeojson = props.format === 'geojson'
  const cleanData = isGeojson ? undefined : (props.data ? cleanseData(props.data) : props.data)

  const columns = useMemo(() => {
    return (props.columns || []).map((column) => ({
      header: column,
      id: column,
      accessorFn: (row) => row[column],
      size: 120,
      minSize: 60,
      meta: { headerClassName: 'table-header' }
    }))
  }, [props.columns])

  return (
    <div id='data-view'>
      <Tabs
        selectedIndex={index}
        onSelect={tabIndex => setIndex(tabIndex)}
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
              <DataTable
                data={cleanData}
                columns={columns}
                page={props.page}
                onNextPageClicked={props.onNextPageClicked}
                datasetName={props.datasetName}
              />
            </div>
          </TabPanel>
        )}
        <TabPanel>
          <div id='data-view-raw'>
            {props.loading
              ? <LoadingElement className='spinner' />
              : <ReactJson src={props.data} theme={getTheme()} collapsed={2} />}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
