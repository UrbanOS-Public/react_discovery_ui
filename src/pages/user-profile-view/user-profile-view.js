import React, { useEffect, useState, useMemo } from 'react'
import Auth0LoginZone from '../../components/auth0-login-zone'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import Modal from 'react-modal'
import AriaModal from 'react-aria-modal'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import './user-profile-view.scss'
import LoadingElement from '../../components/generic-elements/loading-element'
import ErrorComponent from '../../components/generic-elements/error-component'

const UserProfileView = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [datasetToDelete, setVisualizationToDelete] = useState(null)

  const {
    visualizations,
    getUserVisualizations,
    deleteVisualization,
    auth: { isAuthenticated },
    loading,
    loadFailure,
    loadSuccess,
    deleteFailure,
    deleting,
    clearDeleteVisualizationState
  } = props

  const showModal = (modalIsOpen || (deleting || deleteFailure))

  useEffect(() => {
    getUserVisualizations()
  }, [])

  const openDeleteModalForVisualization = (id) => {
    setModalIsOpen(true)
    setVisualizationToDelete(id)
  }

  const confirmDeletion = (id) => {
    deleteVisualization(id)
    setModalIsOpen(false)
  }

  const cancelDeletion = () => {
    setModalIsOpen(false)
    setVisualizationToDelete(null)
    clearDeleteVisualizationState()
  }

  const requestHasNotRun = !loadFailure && !loadSuccess
  if (loading || requestHasNotRun) {
    return (
      <user-profile-view>
        <LoadingElement />
      </user-profile-view>
    )
  }

  if (!isAuthenticated) {
    return <ErrorComponent errorText='You must be signed in to see your saved visualizations' />
  }

  Modal.setAppElement('*')

  const columns = [
    { header: 'Title', accessorKey: 'title', meta: { headerClassName: 'table-header' } },
    { header: 'Date Created', accessorKey: 'created', meta: { headerClassName: 'table-header' } },
    { header: 'Date Modified', accessorKey: 'updated', meta: { headerClassName: 'table-header' } },
    {
      id: 'delete',
      header: '',
      meta: { headerClassName: 'table-header', className: 'centered' },
      size: 50,
      enableSorting: false,
      cell: ({ row }) => (
        <span
          className='delete-icon'
          tabIndex='0'
          aria-label='Delete'
          role='button'
          onKeyDownCapture={(event) => { if (event.key === ' ' || event.key === 'Enter') { openDeleteModalForVisualization(row.original.id) } }}
          onClick={() => { openDeleteModalForVisualization(row.original.id) }}
        >
          <DeleteIcon />
        </span>
      )
    }
  ]

  const modal = showModal
    ? (
      <AriaModal
        titleText='Confirm Delete Workspace'
      >
        <div className='modal-container'>
          <div className='modal-header-box'>
            <div className='modal-title'>
              Confirm Workspace Deletion
            </div>
          </div>
          <div className='paragraph-text'>
            {deleteFailure && <p className='modal-error-text'>There was an error deleting the visualization</p>}
          </div>
          <div className='modal-button-group'>
            <button className='modal-confirm-button' onClick={() => { confirmDeletion(datasetToDelete) }}>Delete</button>
            <button className='modal-cancel-button' onClick={cancelDeletion}>Cancel</button>
          </div>
        </div>
      </AriaModal>
    )
    : false

  return (
    <user-profile-view>
      <div className='left-section'>
        <Auth0LoginZone />
      </div>
      <div className='saved-workspaces right-section'>
        <div className='header-container'>
          <div className='header-text-items'>
            <h1 className='workspaces-header'>Saved Workspaces</h1>
          </div>
        </div>
        <div id='user-visualizations-table'>
          <VisualizationsTable visualizations={visualizations} columns={columns} loading={loading} />
        </div>
      </div>
      {modal}
    </user-profile-view>
  )
}

const VisualizationsTable = ({ visualizations, columns, loading }) => {
  const [sorting, setSorting] = useState([{ id: 'updated', desc: true }])

  const table = useReactTable({
    data: visualizations,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  if (loading) {
    return <LoadingElement className='spinner' />
  }

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope='col'
                  className={header.column.columnDef.meta?.headerClassName || ''}
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
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} className={i % 2 === 0 ? 'striped-row' : ''}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={cell.column.columnDef.meta?.className || ''}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.getPageCount() > 1 && (
        <div className='pagination'>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label='Previous page'
          >
            {'<'}
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label='Next page'
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfileView
