import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Auth0LoginZone from '../../components/auth0-login-zone'
import ReactTable from 'react-table'

import './user-profile-view.scss'
import LoadingElement from '../../components/generic-elements/loading-element'
import ErrorComponent from '../../components/generic-elements/error-component'

const UserProfileView = (props) => {
  const {
    visualizations,
    getUserVisualizations,
    auth: { isAuthenticated },
    loading,
    loadFailure,
    loadSuccess
  } = props

  useEffect(() => {
    getUserVisualizations()
  }, [])


  const requestHasNotRun = !loadFailure && !loadSuccess
  if (loading || requestHasNotRun) {
    return (
      <user-profile-view>
        <LoadingElement />
      </user-profile-view>
    )
  }

  if (!isAuthenticated) {
    return <ErrorComponent errorText={"You must be signed in to see your saved visualizations"} />
  }


  const columns = [
    { Header: "Title", accessor: "title", headerClassName: "table-header" },
    { Header: "Date Created", accessor: "created", headerClassName: "table-header" },
    { Header: "Date Modified", accessor: "updated", headerClassName: "table-header" }
  ]


  return (
    <user-profile-view>
      <div className="left-section">
        <Auth0LoginZone />
      </div>

      <div className="saved-workspaces right-section">
        <div className="header-container">
          <div className="header-text-items">
            <div className="workspaces-header">Saved Workspaces</div>
          </div>
        </div>
        <div id="user-visualizations-table">
          <ReactTable
            data={visualizations}
            columns={columns}
            loading={props.loading}
            defaultPageSize={10}
            classname="-striped -highlight"
          />
        </div>
      </div>
    </user-profile-view>
  )
}


export default UserProfileView
