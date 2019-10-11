import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Popover } from '@material-ui/core'

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
    fetch,
    create,
    finishCreation,
    id,
    query,
    isLoading,
    isLoadError,
    isSaving,
    isSaved,
    isSaveError,
    isSaveable,
    match
  } = props
  React.useEffect(() => { reset() }, [])
  React.useEffect(() => { if (match.params.id) fetch(match.params.id) }, [])

  const handleSave = () => { create("Placeholder Title", query) }

  if (isLoading) {
    return (
      <visualization-view>
        <LoadingElement className='loading-spinner' />
      </visualization-view>
    )
  }

  if (isLoadError) {
    return (
      <visualization-view>
        <ErrorComponent errorText='We were unable to fetch the requested visualization' />
      </visualization-view>
    )
  }

  return (
    <visualization-view>
      <Tabs>
        <TabList className='header'>
          <span className='tab-area'>
            <Tab className='header-item tab' selectedClassName='selected'>Visualize <ChartIcon className='chart-icon' /></Tab>
            <Tab className='header-item tab' selectedClassName='selected'>Write SQL <SQLIcon className='sql-icon' /></Tab>
          </span>
          <span className='action-area'>
            <React.Fragment>
              <TabButton className='header-item save-button' disabled={!(isSaveable)} onClick={handleSave} >
                <SaveIcon />
              </TabButton>
              <AutoAnchoringPopover
                open={isSaving}
                onClose={finishCreation}
                classes={{ paper: 'visualization-view-popover' }}
              >
                <div className='saved-link-dialog'>
                  <GeneratedLink
                    path={routes.visualizationView}
                    params={{ id }}
                    className="link-button" />
                  <SavingElement className='saving-spinner' success={isSaved} failure={isSaveError} />
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