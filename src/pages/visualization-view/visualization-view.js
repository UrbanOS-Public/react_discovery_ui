import React, {useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './visualization-view.scss'

import LoadingElement from '../../components/generic-elements/loading-element'
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
    id, // TODO: more specific name
    query,
    isLoading,
    isLoadFailure,
    isSaving,
    isSaveSuccess,
    isSaveFailure,
    isSaveable,
    match: {params: {id: paramsID}},
    history
  } = props

  React.useEffect(() => { reset() }, [])
  React.useEffect(() => { if (paramsID) load(paramsID) }, [paramsID])
  // React.useEffect(() => { if (id) history.replace( "/visualization/" + id) }, [id]) // TODO: TESTME
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleSave = () => { setDialogOpen(true); save("Placeholder Title", query) }
  const closeDialog = () => { setDialogOpen(false) }

  // TODO: remove this loader so as not to break popover
  if (isLoading) {
    return (
      <visualization-view>
        <LoadingElement className='loading-spinner' />
      </visualization-view>
    )
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
      <Tabs>
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
            {/* TODO: extract component: */}
            <React.Fragment>
              <TabButton disabled={!isSaveable} className={`header-item save-button ${isDialogOpen && 'saving'}`} onClick={handleSave} >
                <SaveIcon />
              </TabButton>
              <AutoAnchoringPopover className='popover-anchor' open={isDialogOpen} onClose={closeDialog} classes={{ paper: 'popover', root: 'popover-root' }} >
                <SaveIndicator saving={isSaving} success={isSaveSuccess} failure={isSaveFailure} linkPath={routes.visualizationView} linkParams={{ id }} />
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
