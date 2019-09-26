import './dataset-visualization-view.scss'
import React, { Component, useState, useEffect } from 'react'
import sqlIcon from '../../assets/blk-database.svg'
import InlineSVG from 'react-svg-inline'
import qs from 'qs'

import DatasetQueryView from '../dataset-query-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import routes from '../../routes'
import { Collapse } from 'react-collapse'
import { GeneratedLink } from '../../components/generic-elements/generated-link'
import LoadingElement from '../../components/generic-elements/loading-element'

const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const [hasUserSubmittedQuery, setHasUserSubmittedQuery] = useState(false)
  const toggleOpen = () => { setOpened(!open) }

  console.log("Visualization props")
  console.log(props)
  const { match: { params }, systemName, dataSources, location, queryData } = props

  //TODO: see if this is the right way to get the systemName
  const sysName = systemName ? systemName : qs.parse(location.search, { ignoreQueryPrefix: true }).systemName

  // const isPageLoadingForFirstTime = props.isLoading && !queryData

  // // Using the react prefix as short term solution to allow
  // // for shallow rendering of components
  // const onInit = () => {
  //   onQueryDataset(defaultQuery)
  // }

  // if (isPageLoadingForFirstTime) {
  //   return (
  //     <dataset-visualization>
  //       <LoadingElement />
  //     </dataset-visualization>)
  // }

  return (
    <dataset-visualization>
      <div className="visualization-header">
        <div className="header">
          <GeneratedLink className='backLink' path={routes.datasetView} params={params}>
            <strong>{'<'} BACK TO DATASET</strong>
          </GeneratedLink>
          <button className='button query-button' onClick={toggleOpen}>
            {open ? 'HIDE QUERY' : 'EDIT QUERY'}
            <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' />
          </button>
        </div>
        <Collapse isOpened={open}>
          <DatasetQueryView systemName={sysName} />
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}



export default DatasetVisualizationView
