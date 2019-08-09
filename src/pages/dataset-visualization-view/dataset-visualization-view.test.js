import { mount } from 'enzyme'
import DatasetVisualizationView from './dataset-visualization-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization';

describe('dataset visualization view', () => {
  const routerProps = {
    params: {
      organization_name: 'data \'r\' us',
      dataset_name: 'some data'
    }
  }
  const dataSources = { data: ['sources'] }

  let subject, queryDatasetMock

  beforeEach(() => {
    queryDatasetMock = jest.fn()

    subject = mount(<DatasetVisualizationView match={routerProps} queryDataset={queryDatasetMock} dataSources={dataSources} />)
  })

  it('queries the dataset using the organization and dataset names', () => {
    expect(queryDatasetMock).toHaveBeenCalledWith(routerProps.params.organization_name, routerProps.params.dataset_name, 'json', 10000)
  })

  it('displays a chart visualization with the provided data sources', () => {
    expect(subject.find(ChartVisualization).props().dataSources).toEqual(dataSources)
  })
})
