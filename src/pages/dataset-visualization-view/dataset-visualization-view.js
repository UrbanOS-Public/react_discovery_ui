import './dataset-visualization-view.scss'
import React, { useState } from 'react'
import sqlIcon from '../../assets/blk-database.svg'
import InlineSVG from 'react-svg-inline'

import DatasetQueryView from '../dataset-query-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import { Collapse } from 'react-collapse'
import LoadingElement from '../../components/generic-elements/loading-element'


const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }
  const { systemName, dataSources, queryData, recommendations } = props

  const onInit = () => {
    console.log("this was an intentional call....")
    props.getRecommendations("SYS_e65d8a26_e157_11e9_af0c_482ae31c4a29")
  }
  React.useEffect(onInit, [])

  if (!recommendations) {
    console.log('hes null')
    console.log(recommendations)
  }

  const isPageLoading = props.isLoading && !queryData

  if (isPageLoading) {
    return (
      <dataset-visualization>
        <LoadingElement />
      </dataset-visualization>
    )
  }

  return (
    <dataset-visualization>
      <div className="visualization-header">
        <div className="header">
          <button className='button query-button' onClick={toggleOpen}>
            {open ? 'HIDE QUERY' : 'EDIT QUERY'}
            <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' />
          </button>
        </div>
        <Collapse isOpened={open}>
          <DatasetQueryView systemName={systemName} freestyleQueryText={props.freestyleQueryText} />
        </Collapse>
        <div>{recommendations}</div>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}


export default DatasetVisualizationView
