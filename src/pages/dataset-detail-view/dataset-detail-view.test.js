import { shallow } from 'enzyme'
import DatasetView from './dataset-detail-view'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import StreamingApiDoc from '../../components/streaming-api-doc'
import DatasetApiDoc from '../../components/dataset-api-doc'
import DatasetQuality from '../../components/dataset-quality'
import DatasetDictionary from '../../components/dataset-dictionary'
import DatasetMetadata from '../../components/dataset-metadata';
import GeoJSONVisualization from '../../components/visualizations/geojson'

describe('dataset detail view', () => {
  let subject
  const routingProps = { params: { id: 1 } }
  const ingestDataset = {
    id: '123',
    name: 'COTA Streaming Busses',
    description: '....',
    sourceType: 'ingest',
    sourceFormat: 'csv',
    sourceUrl: 'http://example.com/sweet-data.csv',
    completeness: {
      recordCount: 50,
      completeness: 0.5798
    }
  }
  const hostedDataset = Object.assign({}, ingestDataset, { sourceType: 'host' })
  const remoteDataset = Object.assign({}, ingestDataset, { sourceType: 'remote' })
  const streamingDataset = Object.assign({}, ingestDataset, { sourceType: 'stream' })

  const createDatasetView = function (dataset) {
    return shallow(
      <DatasetView
        dataset={dataset}
        retrieveDatasetDetails={jest.fn()}
        clearDatasetDetails={jest.fn()}
        clearDatasetPreview={jest.fn()}
        match={routingProps}
      />)
  }

  describe('required items with ingest dataset', () => {
    let retrieveSpy, clearDatasetDetailsSpy, clearDatasetPreviewSpy

    beforeEach(() => {
      retrieveSpy = jest.fn()
      clearDatasetDetailsSpy = jest.fn()
      clearDatasetPreviewSpy = jest.fn()
      subject = shallow(
        <DatasetView
          dataset={ingestDataset}
          retrieveDatasetDetails={retrieveSpy}
          clearDatasetDetails={clearDatasetDetailsSpy}
          clearDatasetPreview={clearDatasetPreviewSpy}
          match={routingProps}
        />
      )
    })

    it('calls retrieve data callback on mount', () => {
      expect(retrieveSpy).toHaveBeenCalled()
    })

    it('loads dataset details with dataset information', () => {
      expect(subject.find(DatasetDetails).props().dataset).toEqual(ingestDataset)
    })

    it('clears dataset when unmounted to prevent caching issues especially with back space', () => {
      subject.unmount()

      expect(clearDatasetDetailsSpy).toHaveBeenCalled()
    })

    it('clears out preview when unmounted to prevent issues', () => {
      subject.unmount()

      expect(clearDatasetPreviewSpy).toHaveBeenCalled()
    })

    it('includes the component for previewing dataset', () => {
      expect(subject.find(DatasetPreview).props().datasetId).toEqual(ingestDataset.id)
    })

    it('should NOT display streaming api doc component', () => {
      expect(subject.find(StreamingApiDoc)).toHaveLength(0)
    })

    it('should display dataset quality component', () => {
      expect(subject.find(DatasetQuality)).toHaveLength(1)
    })
  })

  describe('DatasetView', () => {
    beforeEach(() => {
      const notCsvDataset = Object.assign({}, ingestDataset, { sourceFormat: 'json' })
      subject = createDatasetView(notCsvDataset)
    })

    it('should not render preview when sourceFormat is not CSV', () => {
      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })
  })

  describe('visibility of children with different source types', () => {
    it('should not show hosted explanation when dataset is not remote or hosted', () => {
      const subject = createDatasetView(ingestDataset)

      expect(subject.find('.static-file-explanation')).toHaveLength(0)
    })

    it('should show hosted explanation when dataset is remote', () => {
      const subject = createDatasetView(remoteDataset)

      expect(subject.find('.static-file-explanation')).toHaveLength(1)
    })

    it('should show hosted explanation when dataset is hosted', () => {
      const subject = createDatasetView(hostedDataset)

      expect(subject.find('.static-file-explanation')).toHaveLength(1)
    })

    it('should NOT display streaming api doc component', () => {
      const subject = createDatasetView(remoteDataset)
      expect(subject.find(StreamingApiDoc)).toHaveLength(0)
    })

    it('should NOT display dataset quality component', () => {
      const subject = createDatasetView(remoteDataset)
      expect(subject.find(DatasetQuality)).toHaveLength(0)
    })
  })

  describe('streaming dataset', () => {
    beforeEach(() => {
      subject = createDatasetView(streamingDataset)
    })

    it('includes the component for previewing dataset', () => {
      expect(subject.find(DatasetPreview).props().datasetId).toEqual(streamingDataset.id)
    })

    it('should display streaming api doc component when dataset is streaming', () => {
      expect(subject.find(StreamingApiDoc).props().dataset.id).toEqual(streamingDataset.id)
    })

    it('should display dataset quality component', () => {
      expect(subject.find(DatasetQuality)).toHaveLength(1)
    })
  })

  describe('remote dataset', () => {
    beforeEach(() => {
      subject = createDatasetView(remoteDataset)
    })

    it('does not include component for displaying data preview', () => {
      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })

    it('does not include component for displaying streaming api example', () => {
      expect(subject.find(StreamingApiDoc)).toHaveLength(0)
    })
  })

  describe('hosted dataset', () => {
    beforeEach(() => {
      subject = createDatasetView(hostedDataset)
    })

    it('does not include component for displaying data preview', () => {
      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })

    it('does not include component for displaying api documentation', () => {
      expect(subject.find(DatasetApiDoc)).toHaveLength(0)
    })

    it('does not include component for displaying streaming api example', () => {
      expect(subject.find(StreamingApiDoc)).toHaveLength(0)
    })

    it('does not include component for displaying quality component', () => {
      expect(subject.find(DatasetQuality)).toHaveLength(0)
    })
  })

  describe('streaming api doc by default is', () => {
    it('expanded when type is not csv', () => {
      const streamingDataset = Object.assign({}, ingestDataset, { sourceType: 'stream', sourceFormat: 'json' })
      subject = createDatasetView(streamingDataset)
      expect(subject.find(StreamingApiDoc).props().expanded).toEqual(true)
    })

    it('is collapsed when source is local csv', () => {
      const streamingDataset = Object.assign({}, ingestDataset, { sourceType: 'stream', sourceFormat: 'csv' })
      subject = createDatasetView(streamingDataset)
      expect(subject.find(StreamingApiDoc).props().expanded).toEqual(false)
    })
  })

  describe('api doc by default is', () => {
    it('expanded when type is json and source is ingest', () => {
      const streamingDataset = Object.assign({}, ingestDataset, { sourceType: 'ingest', sourceFormat: 'json' })
      subject = createDatasetView(streamingDataset)
      expect(subject.find(DatasetApiDoc).props().expanded).toEqual(true)
    })

    it('collapsed when type is csv and source is streaming', () => {
      const streamingDataset = Object.assign({}, ingestDataset, { sourceType: 'stream', sourceFormat: 'csv' })
      subject = createDatasetView(streamingDataset)
      expect(subject.find(DatasetApiDoc).props().expanded).toEqual(false)
    })
  })

  describe('geojson visualization', () => {
    it('should not be displayed by default', () => {
      const dataset = Object.assign({}, ingestDataset, { sourceFormat: 'json' })

      subject = createDatasetView(dataset)

      expect(subject.find(GeoJSONVisualization)).toHaveLength(0)
    })

    it('should not be displayed by default', () => {
      const dataset = Object.assign({}, ingestDataset, { sourceFormat: 'geojson' })

      subject = createDatasetView(dataset)

      expect(subject.find(GeoJSONVisualization)).toHaveLength(1)
      expect(subject.find(GeoJSONVisualization).props().datasetId).toEqual(dataset.id)
      expect(subject.find(GeoJSONVisualization).props().format).toEqual(dataset.sourceFormat)
    })

    it('should not be displayed for remote datasets', () => {
      const dataset = Object.assign({}, remoteDataset, { sourceFormat: 'geojson' })

      subject = createDatasetView(dataset)

      expect(subject.find(GeoJSONVisualization)).toHaveLength(0)
    })
  })

  describe('dataset dictionary', () => {
    it('has the provided dataset id and schema', () => {
      const schema = { 'id': 'id' }
      const dataset = Object.assign({}, ingestDataset, { schema })

      subject = createDatasetView(dataset)

      const dictionary = subject.find(DatasetDictionary)
      expect(dictionary).toHaveLength(1)
      expect(dictionary.props().datasetId).toEqual(ingestDataset.id)
      expect(dictionary.props().schema).toEqual(schema)
    })
  })

  describe('dataset metadata', () => {
    it('has the provided dataset', () => {
      subject = createDatasetView(ingestDataset)

      const metadata = subject.find(DatasetMetadata)
      expect(metadata).toHaveLength(1)
      expect(metadata.props().dataset).toEqual(ingestDataset)
    })
  })
})
