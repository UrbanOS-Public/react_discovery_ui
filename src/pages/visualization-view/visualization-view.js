import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { generatePath } from 'react-router'

import './visualization-view.scss'

import SaveIndicator from '../../components/generic-elements/save-indicator'
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import TabButton from '../../components/generic-elements/tab-button'
import AutoAnchoringPopover from '../../components/generic-elements/auto-anchoring-popover'
import ErrorComponent from '../../components/generic-elements/error-component'

import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import ChartView from '../chart-view'
import QueryView from '../query-view'
import routes from '../../routes'

const VisualizationView = (props) => {
  const {
    reset,
    load,
    save,
    update,
    id: idFromState,
    query,
    title,
    isLoadFailure,
    isSaving,
    isSaveSuccess,
    isSaveFailure,
    isSaveable,
    match: { params: { id: idFromUrl } },
    history
  } = props

  const linkUrl = idFromState && generatePath(routes.visualizationView, { id: idFromState })
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [localTitle, setLocalTitle] = useState(title || '')
  React.useEffect(() => { reset() }, [])
  React.useEffect(() => { if (idFromUrl) load(idFromUrl) }, [idFromUrl])
  React.useEffect(() => { if (idFromState) history.push(linkUrl) }, [idFromState])
  React.useEffect(() => { setLocalTitle(title) }, [title])


  const handleTitleChange = (event) => { 
    if (event.target.value!==localTitle) {
      setLocalTitle(event.target.value)
    }
  }
  
  const openDialog = () => { setDialogOpen(true) }

  const handleSaveOrUpdate = () => {
    if (idFromState) {
      update(idFromState, localTitle, query)
    } else {
      save(localTitle, query)
    }
  }
  const closeDialog = () => { setDialogOpen(false); }

  if (isLoadFailure) {
    return (
      <visualization-view>
        <ErrorComponent errorText='We were unable to load the requested visualization' />
      </visualization-view>
    )
  }

  const startIndex = idFromUrl ? 0 : 1

  return (
    <visualization-view>
      <Tabs defaultIndex={startIndex}>
        <TabList className='header'>
          <span className='tab-area'>
            <Tab className='header-item tab' selectedClassName='selected'>
              Visualize <ChartIcon className='chart-icon' />
            </Tab>
            <Tab className='header-item tab' selectedClassName='selected'>
              Write SQL <SQLIcon className='sql-icon' />
            </Tab>
          </span>
          <span className='action-area'>
            <React.Fragment>
              <TabButton disabled={!isSaveable} className={`header-item save-icon ${isDialogOpen && 'saving'}`} onClick={openDialog} >
                <div title='Save Visualization'><SaveIcon /></div>
              </TabButton>
              <AutoAnchoringPopover className='popover-anchor' open={isDialogOpen} onClose={closeDialog} classes={{ paper: 'popover', root: 'popover-root' }} >
                <div>
                  <b>Query Title: </b>
                  <input className="prompt" type="text" placeholder="Query Name" value={localTitle || ''} onChange={handleTitleChange}></input>
                  <ClearIcon className='clear-icon' onClick={closeDialog} />
                  <br />
                  <button className="save-button" onClick={handleSaveOrUpdate} disabled={localTitle == undefined || localTitle.length == 0}>Save</button>
                  <button onClick={closeDialog}>Cancel</button>
                  <SaveIndicator saving={isSaving} success={isSaveSuccess} failure={isSaveFailure} linkUrl={linkUrl} />
                </div>
              </AutoAnchoringPopover>
            </React.Fragment>
          </span>
        </TabList>
        <TabPanel>
          <ChartView />
        </TabPanel>
        <TabPanel>
          <QueryView />
        </TabPanel>
      </Tabs>
    </visualization-view>
  )
}

export default VisualizationView
