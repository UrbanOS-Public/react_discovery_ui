import { shallow } from 'enzyme'
import { Tab, TabPanel } from 'react-tabs'

import DatasetView from './dataset-view'
import QueryView from '../query-view'
import ChartView from '../chart-view'
import DatasetDetailView from '../dataset-detail-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import VisualizationSaveMenuItem from '../../components/visualization-save-menu-item'
import VisualizationListMenuItem from '../../components/visualization-list-menu-item'
import ChartIcon from '../../components/generic-elements/chart-icon'

describe('dataset view', () => {
  let subject
  beforeEach(() => {
    window.DISABLE_VISUALIZATIONS = 'false'
    subject = createSubject()
  })

  it('has three tabs', () => {
    expect(subject.find(Tab).length).toEqual(3)
  })

  it('has three tab panels', () => {
    expect(subject.find(TabPanel).length).toEqual(3)
  })

  it('has a dataset details component', () => {
    expect(subject.find(DatasetDetailView).length).toEqual(1)
  })

  it('has a chart view component', () => {
    expect(subject.find(ChartView).length).toEqual(1)
  })

  it('passes shouldAutoExecuteQuery property to the chart view', () => {
    expect(subject.find(ChartView).props().shouldAutoExecuteQuery).toBe(true)
  })

  it('has a query view component', () => {
    expect(subject.find(QueryView).length).toEqual(1)
  })

  it('passes shouldAutoExecuteQuery property to the query view', () => {
    expect(subject.find(QueryView).props().shouldAutoExecuteQuery).toBe(true)
  })

  it('displays the save icon in the header with expected props', () => {
    subject.setState({ index: 1 })
    expect(subject.find(VisualizationSaveMenuItem)).toHaveLength(1)
    expect(subject.find(VisualizationSaveMenuItem).props().isAuthenticated).toBe(true)
  })

  it('displays the user page icon in the header with expected props', () => {
    subject.setState({ index: 1 })
    expect(subject.find(VisualizationListMenuItem)).toHaveLength(1)
    expect(subject.find(VisualizationListMenuItem).props().isAuthenticated).toBe(true)
  })

  it('hides the save and user page icon on the dataset detail tab', () => {
    subject.setState({ index: 0 })
    expect(subject.find(VisualizationSaveMenuItem)).toHaveLength(0)
    expect(subject.find(VisualizationListMenuItem)).toHaveLength(0)
  })
})

describe('Visualizations when DISABLE_VISUALIZATIONS is true', () => {
  let subject
  beforeEach(() => {
    window.DISABLE_VISUALIZATIONS = 'true'
    subject = createSubject()
  })

  afterEach(() => {
    window.DISABLE_VISUALIZATIONS = 'false'
  })

  it('does not have the visualizations tab', () => {
    expect(subject.find(ChartIcon).length).toEqual(0)
  })

  it('does not have the visualizations view', () => {
    expect(subject.find(ChartView).length).toEqual(0)
  })
})

describe('dataset view when dataset is not loaded', () => {
  let subject
  beforeEach(() => {
    subject = createSubject({ isDatasetLoaded: false })
  })

  it('shows a loading element', () => {
    expect(subject.find(LoadingElement)).toHaveLength(1)
  })

  it('does not have a dataset details component', () => {
    expect(subject.find(DatasetDetailView)).toHaveLength(0)
  })
})

describe('dataset view for a remote dataset', () => {
  let subject
  beforeEach(() => {
    subject = createSubject({ isRemoteDataset: true })
  })

  it('shows a DatasetDetailView', () => {
    expect(subject.find(DatasetDetailView)).toHaveLength(1)
  })

  it('does not show tabs', () => {
    expect(subject.find(Tab)).toHaveLength(0)
  })
})

describe('dataset view for a host dataset', () => {
  let subject
  beforeEach(() => {
    subject = createSubject({ isHostDataset: true })
  })

  it('shows a DatasetDetailView', () => {
    expect(subject.find(DatasetDetailView)).toHaveLength(1)
  })

  it('does not show tabs', () => {
    expect(subject.find(Tab)).toHaveLength(0)
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    match: { params: { organizationName: 'org', datasetName: 'dataset' } },
    dataset: {},
    location: { search: '?systemName=org__dataset' },
    systemName: 'org__dataset',
    retrieveDatasetDetails: jest.fn(),
    setQuery: jest.fn(),
    resetQuery: jest.fn(),
    isDatasetLoaded: true,
    isHostDataset: false,
    isRemoteDataset: false,
    reset: jest.fn(),
    shouldAutoExecuteQuery: true,
    auth: { isAuthenticated: true }
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(<DatasetView {...propsWithDefaults} />)
}
