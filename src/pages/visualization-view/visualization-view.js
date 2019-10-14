import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './visualization-view.scss'
import LoadingElement from '../../components/generic-elements/loading-element'
import SavingElement from '../../components/generic-elements/saving-element'
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import TabButton from '../../components/generic-elements/tab-button'
import { GeneratedLink } from '../../components/generic-elements/generated-link'
import SaveIcon from '@material-ui/icons/Save'
import ChartView from '../chart-view'
import QueryView from '../query-view'
import ErrorComponent from '../../components/generic-elements/error-component'
import routes from '../../routes'
import AutoAnchoringPopover from '../../components/auto-anchoring-popover'

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

  const handleSave = () => { save("Placeholder Title", query) }

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
            <React.Fragment>
              <TabButton className={`header-item save-button ${isSaving && 'saving'}`} disabled={!(isSaveable)} onClick={handleSave} >
                <SaveIcon />
              </TabButton>
              <AutoAnchoringPopover className='popover-anchor' open={isSaving} onClose={finishSaving} classes={{ paper: 'popover', root: 'popover-root' }} >
                <GeneratedLink path={routes.visualizationView} params={{ id }} className="link-button" />
                <SavingElement className='saving-spinner' success={isSaveSuccess} failure={isSaveFailure} />
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