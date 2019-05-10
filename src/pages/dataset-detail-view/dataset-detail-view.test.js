import { shallow } from 'enzyme'
import DatasetView from './dataset-detail-view'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'

describe('dataset detail view', () => {
  let subject
  const routingProps = { params: { id: 1 } }
  const batchDataset = {
    id: '123',
    name: 'COTA Streaming Busses',
    description: '....',
    sourceType: 'batch',
    sourceFormat: 'csv',
    sourceUrl: 'http://example.com/sweet-data.csv'
  }

  describe('required items with batch dataset', () => {
    let retrieveSpy, clearDatasetDetailsSpy

    beforeEach(() => {
      retrieveSpy = jest.fn()
      clearDatasetDetailsSpy = jest.fn()
      subject = shallow(
        <DatasetView
          dataset={batchDataset}
          retrieveDatasetDetails={retrieveSpy}
          clearDatasetDetails={clearDatasetDetailsSpy}
          match={routingProps}
        />
      )
    })

    it('calls retrieve data callback on mount', () => {
      expect(retrieveSpy).toHaveBeenCalled()
    })

    it('loads dataset details with dataset information', () => {
      expect(subject.find(DatasetDetails).props().dataset).toEqual(batchDataset)
    })

    it('clears dataset when unmounted to prevent caching issues especially with back space', () => {
      subject.unmount()

      expect(clearDatasetDetailsSpy).toHaveBeenCalled()
    })

    it('includes the component for previewing dataset', () => {
      expect(subject.find(DatasetPreview).props().datasetId).toEqual(batchDataset.id)
    })
  })

  describe('DatasetView', () => {
    let retrieveSpy, clearDatasetDetailsSpy

    beforeEach(() => {
      const notCsvDataset = {
        id: '123',
        name: 'COTA Streaming Busses',
        description: '....',
        sourceType: 'batch',
        sourceFormat: 'json',
        sourceUrl: 'http://example.com/sweet-data.json'
      }
      retrieveSpy = jest.fn()
      clearDatasetDetailsSpy = jest.fn()
      subject = shallow(
        <DatasetView
          dataset={notCsvDataset}
          retrieveDatasetDetails={retrieveSpy}
          clearDatasetDetails={clearDatasetDetailsSpy}
          match={routingProps}
        />
      )
    })

    it('should not render preview when sourceFormat is not CSV', () => {
      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })
  })

  describe('streaming dataset', () => {
    const streamingDataset = Object.assign({}, batchDataset, { sourceType: 'streaming' })

    beforeEach(() => {
      subject = shallow(
        <DatasetView
          dataset={streamingDataset}
          retrieveDatasetDetails={jest.fn()}
          clearDatasetDetails={jest.fn()}
          match={routingProps}
        />
      )
    })

    it('includes the component for previewing dataset', () => {
      expect(subject.find(DatasetPreview).props().datasetId).toEqual(streamingDataset.id)
    })
  })

  describe('remote dataset', () => {
    const remoteDataset = Object.assign({}, batchDataset, { sourceType: 'remote' })

    beforeEach(() => {
      subject = shallow(
        <DatasetView
          dataset={remoteDataset}
          retrieveDatasetDetails={jest.fn()}
          clearDatasetDetails={jest.fn()}
          match={routingProps}
        />
      )
    })

    it('does not include component for displaying data preview', () => {
      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })
  })
})
