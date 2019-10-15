import React, {useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './visualization-view.scss'

import LoadingElement from '../../components/generic-elements/loading-element'
import SavingElement from '../../components/generic-elements/saving-element'
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import TabButton from '../../components/generic-elements/tab-button'
import GeneratedShareLink from '../../components/generic-elements/generated-share-link'
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
    finishSaving,
    id,
    query,
    isLoading,
    isLoadFailure,
    isSaving,
    isSaveSuccess,
    isSaveFailure,
    isSaveable,
    match: {params: {id: paramsID}}
  } = props

  React.useEffect(() => { reset() }, [])
  React.useEffect(() => { if (paramsID) load(paramsID) }, [])
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleSave = () => { setDialogOpen(true); save("Placeholder Title", query) }
  const closeDialog = () => { setDialogOpen(false) }

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

  const saveSuccessMessaging = (
    <span className='success-message-area'>
        <p>Your visualization has saved, and can be shared with the URL below</p>
        <GeneratedShareLink path={routes.visualizationView} params={{ id }} className="link-button" />
    </span>
  )

  const saveFailureMessaging = (
    <span className='failure-message-area'>
        <p>Your visualization failed to save</p>
    </span>
  )

  const saveMessaging = isSaveSuccess ? saveSuccessMessaging : saveFailureMessaging

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
            <React.Fragment>
              <TabButton disabled={!isSaveable} className={`header-item save-button ${isDialogOpen && 'saving'}`} onClick={handleSave} >
                <SaveIcon />
              </TabButton>
              <AutoAnchoringPopover className='popover-anchor' open={isDialogOpen} onClose={closeDialog} classes={{ paper: 'popover', root: 'popover-root' }} >
                  <SavingElement className='saving-spinner' success={isSaveSuccess} failure={isSaveFailure} />
                { saveMessaging }
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
