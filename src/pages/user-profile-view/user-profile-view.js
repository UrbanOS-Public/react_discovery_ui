import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clone } from 'lodash'
import Auth0LoginZone from '../../components/auth0-login-zone'
import ReactTable from 'react-table'

import './user-profile-view.scss'

const UserProfileView = (props) => {
  const { visualizations, getUserVisualizations } = props

  useEffect(() => { getUserVisualizations() }, [])

  const data = clone(visualizations)
  data.forEach((visualization) => {
    visualization.title = <Link to={`/visualization/${visualization.id}`}>{visualization.title}</Link>
  })

  const columns = [
    {Header: "Title", accessor: "title", headerClassName: "table-header"},
    {Header: "Date Created", accessor: "created", headerClassName: "table-header"},
    {Header: "Date Modified", accessor: "updated", headerClassName: "table-header"}
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
        <ReactTable
          data={data}
          columns={columns}
          loading={props.loading}
          pageSize={10}
          classname={"-striped -highlight"}
        />
      </div>
    </user-profile-view>
  )
}


export default UserProfileView
