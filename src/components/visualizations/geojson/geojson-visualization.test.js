import { shallow } from 'enzyme'
import { Map } from 'react-leaflet'
import GeoJSONVisualization from './geojson-visualization'

describe('<GeoJSONVisualization />', () => {
  const downloadDataset = jest.fn()
  let wrapper

  describe('with no geoJsonData', () => {
    it('renders loader', () => {
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} />)

      expect(wrapper.find('LoadingElement').length).toEqual(1)
    })

    describe('with geoJsonData present', () => {
      const geoJsonData = {
        features: [{
          geometry: {
            coordinates: [[[1, 2], [3, 4], [5, 6]]]
          }
        }]
      }

      beforeEach(() => {
        wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} geoJsonData={geoJsonData} />)
      })

      it('renders map', () => {
        wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} geoJsonData={geoJsonData} />)

        expect(wrapper.find(Map).length).toEqual(1)
        expect(wrapper.find('LoadingElement').length).toEqual(0)
      })

      it('transposes bounding value to appropriate format for leaflet', () => {
        expect(wrapper.find(Map).props().bounds).toEqual([[2, 1], [6, 5]])
      })
    })
  })
})
