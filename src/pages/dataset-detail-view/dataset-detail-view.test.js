import { shallow } from 'enzyme'
import DatasetView from './dataset-detail-view'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import StreamingApiDoc from '../../components/streaming-api-doc'
import DatasetApiDoc from '../../components/dataset-api-doc'
import DatasetQuality from '../../components/dataset-quality'
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
    sourceUrl: 'http://example.com/sweet-data.csv'
  }

  const createDatasetView = function (dataset) {
    return shallow(
      <DatasetView
        dataset={dataset}
        retrieveDatasetDetails={jest.fn()}
        clearDatasetDetails={jest.fn()}
        match={routingProps}
      />)
  }

  describe('required items with ingest dataset', () => {
    let retrieveSpy, clearDatasetDetailsSpy

    beforeEach(() => {
      retrieveSpy = jest.fn()
      clearDatasetDetailsSpy = jest.fn()
      subject = shallow(
        <DatasetView
          dataset={ingestDataset}
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
      expect(subject.find(DatasetDetails).props().dataset).toEqual(ingestDataset)
    })

    it('clears dataset when unmounted to prevent caching issues especially with back space', () => {
      subject.unmount()

      expect(clearDatasetDetailsSpy).toHaveBeenCalled()
    })

    it('includes the component for previewing dataset', () => {
      expect(subject.find(DatasetPreview).props().datasetId).toEqual(ingestDataset.id)
    })

    it('should NOT display streaming api doc component', () => {
      expect(subject.find(StreamingApiDoc).length).toEqual(0)
    })

    it('should display dataset quality component', () => {
      expect(subject.find(DatasetQuality).length).toEqual(1)
    })
  })

  describe('DatasetView', () => {
    let retrieveSpy, clearDatasetDetailsSpy

    beforeEach(() => {
      const notCsvDataset = {
        id: '123',
        name: 'COTA Streaming Busses',
        description: '....',
        sourceType: 'ingest',
        sourceFormat: 'json',
        sourceUrl: 'http://example.com/sweet-data.json'
      }
      retrieveSpy = jest.fn()
      clearDatasetDetailsSpy = jest.fn()
      subject = createDatasetView(notCsvDataset)
    })

    it('should not render preview when sourceFormat is not CSV', () => {
      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })
  })

  describe('visibility of children with different source types', () => {
    it('should not show remote explanation when dataset is not remote', () => {
      const subject = renderDatasetWithSourceType('ingest')

      expect(subject.find('.remote-explanation').length).toEqual(0)
    })

    it('should show remote explanation when dataset is remote', () => {
      const subject = renderDatasetWithSourceType('remote')

      expect(subject.find('.remote-explanation').length).toEqual(1)
    })

    it('should NOT display streaming api doc component', () => {
      const subject = renderDatasetWithSourceType('remote')
      expect(subject.find(StreamingApiDoc).length).toEqual(0)
    })

    it('should NOT display dataset quality component', () => {
      const subject = renderDatasetWithSourceType('remote')
      expect(subject.find(DatasetQuality).length).toEqual(0)
    })

    const renderDatasetWithSourceType = (sourceType) => {
      const dataset = {
        id: '123',
        sourceType: sourceType
      }
      return shallow(
        <DatasetView
          dataset={dataset}
          retrieveDatasetDetails={jest.fn()}
          match={routingProps}
        />
      )
    }
  })

  describe('streaming dataset', () => {
    const streamingDataset = Object.assign({}, ingestDataset, { sourceType: 'stream' })

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
      expect(subject.find(DatasetQuality).length).toEqual(1)
    })
  })

  describe('remote dataset', () => {
    const remoteDataset = Object.assign({}, ingestDataset, { sourceType: 'remote' })

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
    const remoteDataset = Object.assign({}, ingestDataset, { sourceType: 'host' })

    beforeEach(() => {
      subject = createDatasetView(remoteDataset)
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

      expect(subject.find(GeoJSONVisualization).length).toEqual(0)
    })

    it('should not be displayed by default', () => {
      const dataset = Object.assign({}, ingestDataset, { sourceFormat: 'geojson' })

      subject = createDatasetView(dataset)

      expect(subject.find(GeoJSONVisualization).length).toEqual(1)
      expect(subject.find(GeoJSONVisualization).props().datasetId).toEqual(dataset.id)
      expect(subject.find(GeoJSONVisualization).props().format).toEqual(dataset.sourceFormat)
    })
  })
})
