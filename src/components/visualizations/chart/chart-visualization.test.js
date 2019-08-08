import { shallow } from 'enzyme'
import PlotlyEditor from 'react-chart-editor';
import ChartVisualization from './chart-visualization';

describe('chart visualization', () => {
  let subject

  describe('with no dataSources', () => {
    beforeEach(() => {
      subject = shallow(<ChartVisualization plotly={{}} />)
    })

    it('does not render a chart editor', () => {
      expect(subject.find(PlotlyEditor).length).toBe(0)
    })
  })

  describe('with empty dataSources', () => {
    beforeEach(() => {
      subject = shallow(<ChartVisualization plotly={{}} dataSources={{}} />)
    })

    it('does not render a chart editor', () => {
      expect(subject.find(PlotlyEditor).length).toBe(0)
    })
  })

  describe('with dataSources', () => {
    const dataSources = {
      col1: [1, 2, 3],
      col2: [4, 5, 6]
    }
    beforeEach(() => {
      subject = shallow(<ChartVisualization plotly={{}} dataSources={dataSources} />)
    })

    it('renders a chart editor', () => {
      expect(subject.find(PlotlyEditor).length).toBe(1)
    })
  })
})
