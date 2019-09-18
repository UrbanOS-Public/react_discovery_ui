import './dataset-visualization-view.scss'
import { Component, useState } from 'react'

import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import routes from '../../routes';
import qs from 'qs'
import DatasetQuery from '../../components/dataset-query'
import ReactTable from 'react-table'
import { Collapse } from 'react-collapse'
import { GeneratedLink } from '../../components/generic-elements/generated-link';

const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }

  const { match: { params }, dataSources, location: { search } , queryData} = props
  const { systemName } = qs.parse(search, { ignoreQueryPrefix: true })
  const columns = Object.keys(dataSources).map((col) => {
    return { Header: col, accessor: col, headerClassName: 'table-header'}
  })

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
          <div id='dataset-preview'>
        <div className='header-container'>
        </div>
        <div id='dataset-preview-table'>
          <ReactTable data={queryData} columns={columns} className='-striped -highlight'></ReactTable>
        </div>
      </div>
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}

export default DatasetVisualizationView
