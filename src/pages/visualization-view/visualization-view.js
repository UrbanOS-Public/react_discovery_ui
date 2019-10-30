import React, {useState} from 'react'
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
    updateQuery,
    match: {params: {id: idFromUrl}},
    history
  } = props

  const linkUrl = idFromState && generatePath(routes.visualizationView, {id: idFromState})
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [queryTitle, setQueryTitle] = useState(title)
  const shouldUpdateQuery = updateQuery || props.isSaving

  React.useEffect(() => { reset() }, [])
  React.useEffect(() => { if (idFromUrl) load(idFromUrl) }, [idFromUrl])
  React.useEffect(() => { if (idFromState) history.push(linkUrl) }, [idFromState])
  React.useEffect(() => {
    setQueryTitle(title);
  }, [title])

  const handleTitleChange = (event) => {setQueryTitle(event.target.value)}
  const handleUpdate = () =>  {
    setDialogOpen(true)
    if(shouldUpdateQuery) {
      update(idFromState, title, query)
    }
  }
  
  const handleSave = () => {
    if (idFromState) {
      update(idFromState, queryTitle, query)
    } else {
      save(queryTitle, query)
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
              <TabButton disabled={!isSaveable} className={`header-item save-icon ${isDialogOpen && 'saving'}`} onClick={handleUpdate} >
                <div title='Save Visualization'><SaveIcon /></div>
              </TabButton>
              <AutoAnchoringPopover className='popover-anchor' open={isDialogOpen} onClose={closeDialog} classes={{ paper: 'popover', root: 'popover-root' }} >
                {
                <div>
                  <b>Query Title: </b> 
                  <input className="prompt" type="text" placeholder="Query Name" value={queryTitle} onChange={handleTitleChange}></input>
                  <br/>
                  <button className="save-button" onClick={handleSave} disabled={queryTitle==undefined || queryTitle.length == 0}>Save</button>
                  <button onClick={closeDialog}>Cancel</button>
                  <SaveIndicator saving={isSaving} success={isSaveSuccess} failure={isSaveFailure} linkUrl={linkUrl} />
                </div>}
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
