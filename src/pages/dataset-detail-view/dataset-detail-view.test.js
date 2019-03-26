import { shallow } from 'enzyme'
import DatasetView from './dataset-detail-view'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import DatasetRemoteInfo from '../../components/dataset-remote-info'

describe('dataset detail view', () => {
  let subject
  const routingProps = { params: { id: 1 } }
  const batchDataset = {
    id: '123',
    name: 'COTA Streaming Busses',
    description: '....',
    sourceType: 'batch',
    sourceUrl: 'http://example.com/sweet-data.json'
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

    it('does not include component for displaying remote data info', () => {
      expect(subject.find(DatasetRemoteInfo)).toHaveLength(0)
    })

    it('includes the component for previewing dataset', () => {
      expect(subject.find(DatasetPreview).props().dataset_id).toEqual(batchDataset.id)
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
      expect(subject.find(DatasetPreview).props().dataset_id).toEqual(streamingDataset.id)
    })

    it('does not include component for displaying remote data info', () => {
      expect(subject.find(DatasetRemoteInfo)).toHaveLength(0)
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

    it('includes the component for displaying remote dataset information', () => {
      expect(subject.find(DatasetRemoteInfo).props().datasetSourceUrl).toEqual(remoteDataset.sourceUrl)
    })

    it('does not include component for displaying data preview', () => {
      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })
  })
})
