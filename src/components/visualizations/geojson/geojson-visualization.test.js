import { shallow } from 'enzyme'
import GeoJSONVisualization from './geojson-visualization'

describe('<GeoJSONVisualization />', () => {

  const downloadDataset = jest.fn()
  let instance, wrapper

  describe('render', () => {

    it('renders loader when no geoJsonData', () => {
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} />)

      expect(wrapper.find('LoadingElement').length).toEqual(1)
    })

    it('renders map with data values when geoJsonData is present', () => {
      const geoJsonData = {bbox: [1, 2, 3, 4], id: 123}
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} geoJsonData={geoJsonData} />)

      expect(wrapper.find('Map').length).toEqual(1)
      expect(wrapper.find('Map').props().bounds).toEqual([[2, 1], [4, 3]])
      expect(wrapper.find('LoadingElement').length).toEqual(0)
    })
  })

  describe('functions', () => {
    const feature = {
      "geometry": {
        "coordinates": [
          [
            [1, 2],
            [3, 4],
            [5, 6]
          ]
        ]
      }
    }

    beforeAll(() => {
      wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset} />)
      instance = wrapper.instance()
    })

    describe('formatBboxToLeafletBounds', () => {
      it('transposes values to appropriate format for leaflet', () => {
        const result = instance.formatBboxToLeafletBounds([1, 2, 5, 6])

        expect(result).toEqual([[2, 1], [6, 5]])
      })
    })

    describe('determineBbox', () => {

      it('returns bbox when present on the dataset', () => {
        const bbox = [5, 4, 3, 2]
        const geoJsonData = { bbox: bbox }

        const result = instance.determineBbox(geoJsonData)

        expect(result).toEqual(bbox)
      })

      it('calculates bbox when bbox is not present on the dataset', () => {
        const geoJsonData = { features: [feature] }

        const result = instance.determineBbox(geoJsonData)

        expect(result).toEqual([1, 2, 5, 6])
      })

    })
  })
})