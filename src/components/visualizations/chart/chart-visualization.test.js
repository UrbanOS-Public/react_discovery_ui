import { shallow } from 'enzyme'
import PlotlyEditor, { DefaultEditor } from 'react-chart-editor';
import ChartVisualization from './chart-visualization';

describe('chart visualization', () => {
  let subject

  describe('with dataSources', () => {
    const dataSources = {
      col1: [1, 2, 3],
      col2: [4, 5, 6]
    }
    beforeEach(() => {
      window.LOGO_URL = 'https://placekitten.com/530/530'
      window.MAPBOX_ACCESS_TOKEN = 'secret key'
      subject = shallow(<ChartVisualization plotly={{}} dataSources={dataSources} />)
    })

    it('renders a chart editor', () => {
      expect(subject.find(PlotlyEditor).length).toBe(1)
    })

    it('configures the editor with empty data by default', () => {
      expect(subject.find(PlotlyEditor).props().data).toEqual([])
    })

    it('configures the editor with empty layout by default', () => {
      expect(subject.find(PlotlyEditor).props().layout).toEqual({})
    })

    it('configures the editor with empty frames by default', () => {
      expect(subject.find(PlotlyEditor).props().frames).toEqual([])
    })

    it('converts data sources to options for editor', () => {
      expect(subject.find(PlotlyEditor).props().dataSourceOptions).toEqual([
        { value: 'col1', label: 'col1' },
        { value: 'col2', label: 'col2' },
      ])
    })

    it('configures the editor with the provided logo', () => {
      expect(subject.find(DefaultEditor).length).toBe(1)
      expect(subject.find(DefaultEditor).props().logoSrc).toBe(window.LOGO_URL)
    })

    it('configures the editor with the provided mapbox api token', () => {
      expect(subject.find(PlotlyEditor).props().config.mapboxAccessToken).toBe('secret key')
    })
  })
})
