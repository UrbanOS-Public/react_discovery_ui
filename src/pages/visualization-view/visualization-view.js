import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { generatePath } from 'react-router'
import { Link } from 'react-router-dom'

import './visualization-view.scss'


import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import TabButton from '../../components/generic-elements/tab-button'
import AutoAnchoringPopover from '../../components/generic-elements/auto-anchoring-popover'
import ErrorComponent from '../../components/generic-elements/error-component'
import SaveButtonPopover from '../../components/save-button-popover/'

import folderIcon from '../../assets/folder_icon.png'

import ChartView from '../chart-view'
import QueryView from '../query-view'
import routes from '../../routes'
import Auth0LoginZone from '../../components/auth0-login-zone'
import UserPageButtonPopover from '../../components/user-page-button-popover'



const VisualizationView = (props) => {
  const {
    reset,
    load,
    save,
    id: idFromState,
    query,
    title,
    isLoadFailure,
    isSaving,
    isSaveSuccess,
    isSaveFailure,
    isSaveable,
    match: { params: { id: idFromUrl } },
    history,
    auth: {isAuthenticated}
  } = props

  const linkUrl = idFromState && generatePath(routes.visualizationView, { id: idFromState })
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [localTitle, setLocalTitle] = useState(title || '')
  const startIndex = idFromUrl ? 1 : 0
  const [index, setIndex] = useState(startIndex)
  const [userNeedsLoginInfo, setUserNeedsLoginInfo] = useState(false)

  React.useEffect(() => { reset() }, [])
  React.useEffect(() => { if (idFromUrl && idFromUrl !== idFromState) load(idFromUrl) }, [idFromUrl])
  React.useEffect(() => { if (idFromState && idFromUrl !== idFromState) history.push(linkUrl) }, [idFromState])
  React.useEffect(() => { setLocalTitle(title) }, [title])

  const handleTitleChange = (event) => {
    if (event.target.value !== localTitle) {
      setLocalTitle(event.target.value)
    }
  }

  const openDialog = () => { setDialogOpen(true) }

  const showLoginPrompt = () => { setUserNeedsLoginInfo(true)}
  const closeLoginPrompt = () => { setUserNeedsLoginInfo(false)}

  const handleSaveOrUpdate = () => {
    save({ id: idFromState, title: localTitle, query })
  }
  const closeDialog = () => { setDialogOpen(false); }

  if (isLoadFailure) {
    return (
      <visualization-view>
        <ErrorComponent errorText='We were unable to load the requested visualization' />
      </visualization-view>
    )
  }

  return (
    <visualization-view>
      <Tabs selectedIndex={index} onSelect={tabIndex => setIndex(tabIndex)} >
        <TabList className='header'>
          <span className='tab-area'>
            <Tab className='header-item tab' selectedClassName='selected'>
              Write SQL <SQLIcon className='sql-icon' />
            </Tab>
            <Tab className='header-item tab' selectedClassName='selected'>
              Visualize <ChartIcon className='chart-icon' />
            </Tab>
          </span>
          <span className='action-area'>
            <React.Fragment >
              <UserPageButtonPopover
                isAuthenticated={isAuthenticated}
                showLoginPrompt={showLoginPrompt}
                closeLoginPrompt={closeLoginPrompt}
                userNeedsLoginInfo={userNeedsLoginInfo}
              />
              <SaveButtonPopover
                isSaveable={isSaveable}
                isDialogOpen={isDialogOpen}
                openDialog={openDialog}
                closeDialog={closeDialog}
                handleTitleChange={handleTitleChange}
                handleSaveOrUpdate={handleSaveOrUpdate}
                linkUrl={linkUrl}
                isSaveFailure={isSaveFailure}
                isSaveSuccess={isSaveSuccess}
                localTitle={localTitle}
              />
            </React.Fragment>
          </span>
        </TabList>
        <TabPanel>
          <QueryView />
        </TabPanel>
        <TabPanel className="visualization" selectedClassName="visualization--selected">
          <ChartView />
        </TabPanel>
      </Tabs>
    </visualization-view >
  )
}

export default VisualizationView
