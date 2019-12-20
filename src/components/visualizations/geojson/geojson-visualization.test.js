import { shallow } from 'enzyme'
import { Map } from 'react-leaflet'
import GeoJSONVisualization from './geojson-visualization'
import Checkbox from '../../../components/generic-elements/checkbox'

describe('<GeoJSONVisualization />', () => {
  let wrapper, downloadDataset, previewDataset

  beforeEach(() => {
    downloadDataset = jest.fn()
    previewDataset = jest.fn()
  })

  it('calls to preview and download dataset on mount', () => {
    wrapper = shallow(<GeoJSONVisualization
      previewDataset={previewDataset}
      downloadDataset={downloadDataset}
      datasetId={'345'}
    />)

    expect(previewDataset).toHaveBeenCalledWith('345', 'geojson')
    expect(downloadDataset).toHaveBeenCalledWith('345', 'geojson')
  })

  describe('with a downloaded dataset error', () => {
    beforeEach(() => {
      wrapper = shallow(<GeoJSONVisualization
        previewDataset={previewDataset}
        downloadDataset={downloadDataset}
        downloadedDatasetError
      />)
    })

    it('renders an error component', () => {
      expect(wrapper.find('ErrorComponent').length).toEqual(1)
    })

    it('does not render maps', () => {
      expect(wrapper.find('[test-id="preview-map"]').length).toEqual(0)
      expect(wrapper.find('[test-id="downloaded-map"]').length).toEqual(0)
    })

    it('does not render a loader', () => {
      expect(wrapper.find('LoadingElement').length).toEqual(0)
    })
  })

  describe('without downloaded or previewed geoJsonData and error', () => {
    it('renders loader', () => {
      wrapper = shallow(<GeoJSONVisualization
        previewDataset={previewDataset}
        downloadDataset={downloadDataset}
      />)


      expect(wrapper.find('LoadingElement').length).toEqual(1)
    })

    it('renders an error component', () => {
      expect(wrapper.find('ErrorComponent').length).toEqual(0)
    })
  })

  describe('with geoJsonData present', () => {
    const downloadedGeoJsonData = {
      features: [{
        geometry: {
          type: 'MultiLineString',
          coordinates: [[[1, 2], [3, 4], [5, 6]]]
        }
      },
      {
        geometry: {
          type: 'MultiLineString',
          coordinates: [[[2, 3], [4, 5], [6, 7]]]
        }
      }]
    }

    const previewedGeoJsonData = {
      features: [{
        geometry: {
          type: 'MultiLineString',
          coordinates: [[[1, 2], [3, 4], [5, 6]]]
        }
      }]
    }

    describe('and both previewed and downloaded geojson data available', () => {
      beforeEach(() => {
        wrapper = shallow(<GeoJSONVisualization
          previewDataset={previewDataset}
          downloadDataset={downloadDataset}
          downloadedGeoJsonData={downloadedGeoJsonData}
          previewedGeoJsonData={previewedGeoJsonData}
        />)
      })

      it('renders map', () => {
        expect(wrapper.find(Map).length).toEqual(2)
        expect(wrapper.find('LoadingElement').length).toEqual(0)
        expect(wrapper.find('ErrorComponent').length).toEqual(0)
      })

      it('transposes preview data bounding value to appropriate format for leaflet', () => {
        const previewMapWrapper = wrapper.find('[test-id="preview-map"]')
        expect(previewMapWrapper.find(Map).props().bounds).toEqual([[2, 1], [6, 5]])
      })

      it('shows the preview data by default', () => {
        expect(isPreviewMapRendered(wrapper)).toBeTruthy()
        expect(isDownloadedMapRendered(wrapper)).toBeTruthy()
        expect(isPreviewMapHidden(wrapper)).toBeFalsy()
        expect(isDownloadedMapHidden(wrapper)).toBeTruthy()
      })

      it('the show full data toggle is enabled', () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeFalsy()
      })

      it('shows the downloaded data when toggle is clicked', () => {
        wrapper.find(Checkbox).props().clickHandler()
        expect(isPreviewMapHidden(wrapper)).toBeTruthy()
        expect(isDownloadedMapHidden(wrapper)).toBeFalsy()
      })
    })

    describe('and only previewed geojson data available', () => {
      beforeEach(() => {
        wrapper = shallow(<GeoJSONVisualization
          previewDataset={previewDataset}
          downloadDataset={downloadDataset}
          previewedGeoJsonData={previewedGeoJsonData}
        />)
      })

      it('renders map', () => {
        expect(isPreviewMapRendered(wrapper)).toBeTruthy()
        expect(isDownloadedMapRendered(wrapper)).toBeFalsy()
        expect(wrapper.find('LoadingElement').length).toEqual(0)
        expect(wrapper.find('ErrorComponent').length).toEqual(0)
      })

      it('transposes preview data bounding value to appropriate format for leaflet', () => {
        const previewMapWrapper = wrapper.find('[test-id="preview-map"]')
        expect(previewMapWrapper.find(Map).props().bounds).toEqual([[2, 1], [6, 5]])
      })

      it('shows the preview data by default', () => {
        expect(isPreviewMapRendered(wrapper)).toBeTruthy()
        expect(isDownloadedMapRendered(wrapper)).toBeFalsy()
      })

      it('the show full data toggle is disabled', () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeTruthy()
      })
    })

    describe('and only downloaded geojson data available', () => {
      beforeEach(() => {
        wrapper = shallow(<GeoJSONVisualization
          previewDataset={previewDataset}
          downloadDataset={downloadDataset}
          downloadedGeoJsonData={downloadedGeoJsonData}
        />)
      })

      it('renders map', () => {
        expect(isPreviewMapRendered(wrapper)).toBeFalsy()
        expect(isDownloadedMapRendered(wrapper)).toBeTruthy()
        expect(wrapper.find('LoadingElement').length).toEqual(0)
        expect(wrapper.find('ErrorComponent').length).toEqual(0)
      })

      it('transposes downloaded data bounding value to appropriate format for leaflet', () => {
        const downloadedMapWrapper = wrapper.find('[test-id="downloaded-map"]')
        expect(downloadedMapWrapper.find(Map).props().bounds).toEqual([[2, 1], [7, 6]])
      })

      it('shows the downloaded data by default', () => {
        expect(isPreviewMapRendered(wrapper)).toBeFalsy()
        expect(isDownloadedMapRendered(wrapper)).toBeTruthy()
      })

      it('the show full data toggle is disabled', () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeTruthy()
      })
    })
  })

  describe('with geoJsonData with no coordinates', () => {
    it('displays a default bounding box', () => {
      const previewedGeoJsonData = { features: [] }
      const downloadedGeoJsonData = { features: [], bbox: [null, null, null, null] }
      wrapper = shallow(
        <GeoJSONVisualization
          previewDataset={previewDataset}
          downloadDataset={downloadDataset}
          previewedGeoJsonData={previewedGeoJsonData}
          downloadedGeoJsonData={downloadedGeoJsonData}
        />)

      const previewMapWrapper = wrapper.find('[test-id="preview-map"]')
      expect(previewMapWrapper.find(Map).props().bounds).toEqual([[38.483320, -84.811309], [41.971108, -80.541532]])
    })
  })

  describe('with no geoJsonData', () => {
    it('the show full data toggle is disabled', () => {
      wrapper = shallow(
        <GeoJSONVisualization
          previewDataset={previewDataset}
          downloadDataset={downloadDataset}
          previewedGeoJsonData={undefined}
          downloadedGeoJsonData={undefined} />)

      expect(wrapper.find(Checkbox).props().disabled).toBeTruthy()
    })
  })
})

function isPreviewMapHidden(wrapper) {
  const previewMapWrapper = wrapper.find('[test-id="preview-map"]')
  return previewMapWrapper.hasClass('hidden')
}

function isDownloadedMapHidden(wrapper) {
  const dowloadedMapWrapper = wrapper.find('[test-id="downloaded-map"]')
  return dowloadedMapWrapper.hasClass('hidden')
}

function isPreviewMapRendered(wrapper) {
  return wrapper.find('[test-id="preview-map"]').exists()
}

function isDownloadedMapRendered(wrapper) {
  return wrapper.find('[test-id="downloaded-map"]').exists()
}
