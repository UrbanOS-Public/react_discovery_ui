import './dataset-visualization-view.scss'
import { Component, useState } from 'react'

import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import routes from '../../routes';
import qs from 'qs'
import DatasetQuery from '../../components/dataset-query'
import { Collapse } from 'react-collapse'
import { GeneratedLink } from '../../components/generic-elements/generated-link';

const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }

  const { match: { params }, dataSources, location: { search } } = props
  const { systemName } = qs.parse(search, { ignoreQueryPrefix: true })

  return (
    <dataset-visualization>
      <div className="visualization-header">
        <div className="header">
          <GeneratedLink className="button" path={routes.datasetView} params={params}>
            Back to Dataset
          </GeneratedLink>
          <button className='button' onClick={toggleOpen}>
            {open ? 'Hide Query' : 'Edit Query'}
          </button>
        </div>
        <Collapse isOpened={open}>
          <DatasetQuery systemName={systemName} />
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}

export default DatasetVisualizationView
