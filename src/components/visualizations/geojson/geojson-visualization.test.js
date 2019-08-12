import { shallow } from 'enzyme'
import { Map } from 'react-leaflet'
import GeoJSONVisualization from './geojson-visualization'

describe('<GeoJSONVisualization />', () => {
  const downloadDataset = jest.fn()
  let wrapper

  describe('with a downloaded dataset error', () => {
    beforeEach(() => {
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} downloadedDatasetError />)
    })
    it('renders an error component', () => {
      expect(wrapper.find('ErrorComponent').length).toEqual(1)
    })
    it('does not render a map', () => {
      expect(wrapper.find('Map').length).toEqual(0)
    })
    it('does not render a loader', () => {
      expect(wrapper.find('LoadingElement').length).toEqual(0)
    })
  })

  describe('without geoJsonData and error', () => {
    it('renders loader', () => {
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} />)

      expect(wrapper.find('LoadingElement').length).toEqual(1)
    })
    it('renders an error component', () => {
      expect(wrapper.find('ErrorComponent').length).toEqual(0)
    })
  })

  describe('with geoJsonData present', () => {
    const geoJsonData = {
      features: [{
        geometry: {
          type: 'MultiLineString',
          coordinates: [[[1, 2], [3, 4], [5, 6]]]
        }
      }]
    }

    beforeEach(() => {
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} geoJsonData={geoJsonData} />)
    })

    it('renders map', () => {
      expect(wrapper.find(Map).length).toEqual(1)
      expect(wrapper.find('LoadingElement').length).toEqual(0)
      expect(wrapper.find('ErrorComponent').length).toEqual(0)
    })

    it('transposes bounding value to appropriate format for leaflet', () => {
      expect(wrapper.find(Map).props().bounds).toEqual([[2, 1], [6, 5]])
    })
  })

  describe('with geoJsonData with no coordinates', () => {
    it('displays a default bounding box', () => {
      const geoJsonData = { features: [] }
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} geoJsonData={geoJsonData} />)

      expect(wrapper.find(Map).props().bounds).toEqual([[38.483320, -84.811309], [41.971108, -80.541532]])
    })
  })
})
