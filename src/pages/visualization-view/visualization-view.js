import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { generatePath } from 'react-router'

import './visualization-view.scss'

import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import ErrorComponent from '../../components/generic-elements/error-component'
import VisualizationSaveMenuItem from '../../components/visualization-save-menu-item'
import ChartView from '../chart-view'
import QueryView from '../query-view'
import routes from '../../routes'
import VisualizationListMenuItem from '../../components/visualization-list-menu-item'

const VisualizationView = (props) => {
  const {
    reset,
    load,
    save,
    id: idFromState,
    query,
    title,
    allowedActions,
    isLoadFailure,
    isSaveSuccess,
    isSaveFailure,
    isSaveable,
    match: { params: { id: idFromUrl } },
    history,
    auth: { isAuthenticated }
  } = props

  const linkUrl = idFromState && generatePath(routes.visualizationView, { id: idFromState })
  const [localTitle, setLocalTitle] = useState(title || '')
  const [index, setIndex] = useState(0)

  React.useEffect(() => { return function cleanup () { reset() } }, [])
  React.useEffect(() => { if (idFromUrl && idFromUrl !== idFromState) load(idFromUrl) }, [idFromUrl])
  React.useEffect(() => { if (idFromState && idFromUrl !== idFromState) history.push(linkUrl) }, [idFromState])
  React.useEffect(() => { setLocalTitle(title) }, [title])

  const handleTitleChange = (event) => {
    if (event.target.value !== localTitle) {
      setLocalTitle(event.target.value)
    }
  }

  const handleSaveOrUpdate = ({ shouldCreateCopy }) => {
    save({ id: idFromState, title: localTitle, query, shouldCreateCopy })
  }

  const isVisualizationEnabled = () => {
    return window.DISABLE_VISUALIZATIONS === 'false'
  }

  if (isLoadFailure) {
    return (
      <visualization-view>
        <ErrorComponent errorText='We were unable to load the requested visualization' />
      </visualization-view>
    )
  }

  return (
    <visualization-view>
      <Tabs selectedIndex={index} onSelect={tabIndex => setIndex(tabIndex)}>
        <TabList className='header'>
          <span className='tab-area'>
            <Tab className='header-item tab' selectedClassName='selected'>
              Write SQL <SQLIcon className='sql-icon' />
            </Tab>
            {isVisualizationEnabled() &&
              <Tab className='header-item tab' selectedClassName='selected'>
                Visualize <ChartIcon className='chart-icon'/>
              </Tab>
            }
          </span>
          <span className='action-area'>
            <>
              <VisualizationListMenuItem
                isAuthenticated={isAuthenticated}
              />
              <VisualizationSaveMenuItem
                isSaveable={isSaveable}
                handleTitleChange={handleTitleChange}
                handleSaveOrUpdate={handleSaveOrUpdate}
                linkUrl={linkUrl}
                isSaveFailure={isSaveFailure}
                isSaveSuccess={isSaveSuccess}
                title={localTitle}
                allowedActions={allowedActions}
                isAuthenticated={isAuthenticated}
              />
            </>
          </span>
        </TabList>
        <TabPanel>
          <QueryView />
        </TabPanel>
        <TabPanel className='visualization' selectedClassName='visualization--selected'>
          <ChartView />
        </TabPanel>
      </Tabs>
    </visualization-view>
  )
}

export default VisualizationView
