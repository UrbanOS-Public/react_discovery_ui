import { shallow } from 'enzyme'

import DatasetVisualizationView from './dataset-visualization-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import { Collapse } from 'react-collapse'

describe('dataset visualization view', () => {
  const routerProps = {
    params: {
      organizationName: 'data \'r\' us',
      datasetName: 'some data'
    }
  }
  const dataSources = { data: ['sources'] }

  let subject

  beforeEach(() => {
    subject = shallow(
      <DatasetVisualizationView
        match={routerProps}
        location={{ search: {} }}
        dataSources={dataSources} />
    )
  })

  it('displays a chart visualization with the provided data sources', () => {
    expect(subject.find(ChartVisualization).props().dataSources).toEqual(dataSources)
  })

  it('displays a chart header with an initially collapsed toggle', () => {
    expect(subject.find(Collapse).props().isOpened).toEqual(false)
  })
})
