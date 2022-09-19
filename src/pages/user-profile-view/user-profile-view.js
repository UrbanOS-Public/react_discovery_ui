import React, { useEffect, useState } from 'react'
import Auth0LoginZone from '../../components/auth0-login-zone'
import ReactTable from 'react-table'
import Modal from 'react-modal'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import './user-profile-view.scss'
import LoadingElement from '../../components/generic-elements/loading-element'
import ErrorComponent from '../../components/generic-elements/error-component'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

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
    { Header: 'Title', accessor: 'title', headerClassName: 'table-header' },
    { Header: 'Date Created', accessor: 'created', headerClassName: 'table-header' },
    { Header: 'Date Modified', accessor: 'updated', headerClassName: 'table-header' },
    {
      Header: '',
      accessor: 'delete',
      headerClassName: 'table-header',
      className: 'centered',
      width: 50,
      Cell: ({ original }) => (
        <span className='delete-icon' onClick={() => { openDeleteModalForVisualization(original.id) }}>
          <DeleteIcon />
        </span>
      )
    }
  ]

  return (
    <user-profile-view>
      <div className='left-section'>
        <Auth0LoginZone />
      </div>
      <div className='saved-workspaces right-section'>
        <div className='header-container'>
          <div className='header-text-items'>
            <div className='workspaces-header'>Saved Workspaces</div>
          </div>
        </div>
        <div id='user-visualizations-table'>
          <ReactTable
            data={visualizations}
            columns={columns}
            defaultSorted={[{ id: 'updated', desc: true }]}
            loading={props.loading}
            defaultPageSize={10}
            className='-striped -highlight'
          />
        </div>
      </div>
      <Modal
        isOpen={showModal}
        style={customStyles}
        contentLabel='Delete Modal'
      >
        <p>Are you sure you want to delete this workspace?</p>
        {deleteFailure && <p className='modal-error-text'>There was an error deleting the visualization</p>}
        <div className='modal-button-group'>
          <button className='modal-cancel modal-button' onClick={cancelDeletion}>Cancel</button>
          <button className='modal-confirm modal-button' onClick={() => { confirmDeletion(datasetToDelete) }}>Delete</button>
        </div>
      </Modal>
    </user-profile-view>
  )
}

export default UserProfileView
