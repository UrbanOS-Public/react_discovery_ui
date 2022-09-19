import { shallow } from 'enzyme'
import DatasetView from './dataset-detail-view'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import StreamingApiDoc from '../../components/streaming-api-doc'
import DatasetApiDoc from '../../components/dataset-api-doc'
import DatasetQuality from '../../components/dataset-quality'
import DatasetDictionary from '../../components/dataset-dictionary'
import DatasetMetadata from '../../components/dataset-metadata'
import GeoJSONVisualization from '../../components/visualizations/geojson'

describe('dataset detail view', () => {
  let subject
  const routingProps = { params: { id: 1 } }
  const dataset = {
    id: '123',
    name: 'COTA Streaming Busses',
    description: '....',
    sourceType: 'ingest',
    fileTypes: ['csv'],
    sourceUrl: 'http://example.com/sweet-data.csv',
    completeness: {
      recordCount: 50,
      completeness: 0.5798
    }
  }

  const createDatasetView = function (dataset, extraProps = {}) {
    return shallow(
      <DatasetView
        dataset={dataset}
        retrieveDatasetDetails={jest.fn()}
        clearDatasetDetails={jest.fn()}
        clearDatasetPreview={jest.fn()}
        match={routingProps}
        {...extraProps}
      />
    )
  }

  describe('required items with ingest dataset', () => {
    let retrieveSpy, clearDatasetDetailsSpy, clearDatasetPreviewSpy

    beforeEach(() => {
      retrieveSpy = jest.fn()
      clearDatasetDetailsSpy = jest.fn()
      clearDatasetPreviewSpy = jest.fn()
      subject = shallow(
        <DatasetView
          dataset={dataset}
          retrieveDatasetDetails={retrieveSpy}
          clearDatasetDetails={clearDatasetDetailsSpy}
          clearDatasetPreview={clearDatasetPreviewSpy}
          match={routingProps}
          isIngest
          isStreaming={false}
        />
      )
    })

    it('loads dataset details with dataset information', () => {
      expect(subject.find(DatasetDetails).props().dataset).toEqual(
        dataset
      )
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
      expect(subject.find(DatasetPreview).props().datasetId).toEqual(
        dataset.id
      )
    })

    it('should NOT display streaming api doc component', () => {
      expect(subject.find(StreamingApiDoc)).toHaveLength(0)
    })

    it('should display dataset quality component', () => {
      expect(subject.find(DatasetQuality)).toHaveLength(1)
    })
  })

  describe('visibility of children with different source types', () => {
    it('should not show hosted explanation when dataset is not remote or hosted', () => {
      const subject = createDatasetView(dataset, {
        isRemote: false,
        isHost: false,
        isGeoJSON: false
      })

      expect(subject.find('.static-file-explanation')).toHaveLength(0)
    })

    it('should show hosted explanation when dataset is remote', () => {
      const subject = createDatasetView(dataset, {
        isRemote: true,
        isGeoJSON: false
      })

      expect(subject.find('.static-file-explanation')).toHaveLength(1)
    })

    it('should not show preview when hosted', () => {
      const subject = createDatasetView(dataset, {
        isHost: true
      })

      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })

    it('should not show preview when remote', () => {
      const subject = createDatasetView(dataset, {
        isRemote: true
      })

      expect(subject.find(DatasetPreview)).toHaveLength(0)
    })

    it('should show hosted explanation when dataset is hosted', () => {
      const subject = createDatasetView(dataset, {
        isHost: true
      })

      expect(subject.find('.static-file-explanation')).toHaveLength(1)
    })

    it('should NOT display streaming api doc component', () => {
      const subject = createDatasetView(dataset, {
        isStreaming: false
      })
      expect(subject.find(StreamingApiDoc)).toHaveLength(0)
    })

    it('should NOT display dataset quality component', () => {
      const subject = createDatasetView(dataset, {
        isRemote: true,
        isIngest: false
      })
      expect(subject.find(DatasetQuality)).toHaveLength(0)
    })
  })

  describe('streaming dataset', () => {
    beforeEach(() => {
      subject = createDatasetView(dataset, {
        isIngest: true,
        isCsv: true,
        isStreaming: true
      })
    })

    it('includes the component for previewing dataset', () => {
      expect(subject.find(DatasetPreview).props().datasetId).toEqual(
        dataset.id
      )
    })

    it('should display streaming api doc component when dataset is streaming', () => {
      expect(subject.find(StreamingApiDoc).props().dataset.id).toEqual(
        dataset.id
      )
    })

    it('should display dataset quality component', () => {
      expect(subject.find(DatasetQuality)).toHaveLength(1)
    })
  })

  describe('remote dataset', () => {
    beforeEach(() => {
      subject = createDatasetView(dataset, {
        isRemote: true,
        isIngest: false,
        isCsv: true
      })
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
      subject = createDatasetView(dataset, {
        isIngest: false,
        isStreaming: false
      })
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

  describe('streaming api doc', () => {
    it('expanded when type is not csv', () => {
      subject = createDatasetView(dataset, {
        isCsv: false,
        isStreaming: true
      })
      expect(subject.find(StreamingApiDoc).props().expanded).toEqual(true)
    })

    it('is collapsed when source is local csv', () => {
      subject = createDatasetView(dataset, {
        isCsv: true,
        isStreaming: true
      })
      expect(subject.find(StreamingApiDoc).props().expanded).toEqual(false)
    })
  })

  describe('api doc by default is', () => {
    it('expanded when type is json and source is ingest', () => {
      subject = createDatasetView(dataset, {
        isStreaming: false,
        isIngest: true,
        isCsv: false
      })
      expect(subject.find(DatasetApiDoc).props().expanded).toEqual(true)
    })

    it('collapsed when type is csv and source is streaming', () => {
      subject = createDatasetView(dataset, {
        isCsv: true,
        isIngest: true,
        isStreaming: true
      })
      expect(subject.find(DatasetApiDoc).props().expanded).toEqual(false)
    })
  })

  describe('geojson visualization', () => {
    it('should not be displayed by default', () => {
      subject = createDatasetView(dataset, {
        isGeoJSON: false
      })

      expect(subject.find(GeoJSONVisualization)).toHaveLength(0)
    })

    it('should be displayed when the dataset is geojson', () => {
      subject = createDatasetView(dataset, {
        isGeoJSON: true
      })

      expect(subject.find(GeoJSONVisualization)).toHaveLength(1)
      expect(subject.find(GeoJSONVisualization).props().datasetId).toEqual(
        dataset.id
      )
    })
  })

  describe('dataset dictionary', () => {
    it('has the provided dataset id and schema', () => {
      const schema = { id: 'id' }
      const dataset = Object.assign({}, dataset, { schema })

      subject = createDatasetView(dataset)

      const dictionary = subject.find(DatasetDictionary)
      expect(dictionary).toHaveLength(1)
      expect(dictionary.props().datasetId).toEqual(dataset.id)
      expect(dictionary.props().schema).toEqual(schema)
    })
  })

  describe('dataset metadata', () => {
    it('has the provided dataset', () => {
      subject = createDatasetView(dataset)

      const metadata = subject.find(DatasetMetadata)
      expect(metadata).toHaveLength(1)
      expect(metadata.props().dataset).toEqual(dataset)
    })
  })
})
