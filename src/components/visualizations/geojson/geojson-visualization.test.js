import { shallow, mount } from 'enzyme'
import GeoJSONVisualization from './geojson-visualization'

describe('<Map />', () => {

  const downloadDataset = jest.fn()

  it('getCenterFromBbox is called when component mounts', () => {
    const wrapper = shallow(<GeoJSONVisualization downloadDataset={downloadDataset}/>)
    const map = wrapper.instance()
    expect(map.calculateCenterFromBbox([5, 10, 10, 20])).toEqual([15, 7.5])
  })
})