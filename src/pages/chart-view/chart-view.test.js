import { shallow } from 'enzyme'

import ChartView from './chart-view'
import PlotlyEditor, { DefaultEditor } from 'react-chart-editor'
import LoadingElement from '../../components/generic-elements/loading-element'
import * as ReactChartLibrary from 'react-chart-editor/lib'

// Currently, shallow rendering is not compatible with React hooks.
// We've utilized a strategy found here https://blog.carbonfive.com/2019/08/05/shallow-testing-hooks-with-enzyme/
// which should become unneccessary in the near future
const runUseEffect = () => {
  const useEffect = jest.spyOn(React, 'useEffect')
  useEffect.mockImplementation(f => f())
}

describe('chart view', () => {
  const chartDataSources = { data: ['sources'] }

  let subject

  beforeEach(() => {
    runUseEffect()
  })

  describe('before load', () => {
    beforeEach(() => {
      subject = createSubject({ isLoading: true })
    })

    it('shows full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toBe(1)
    })

    it('does not display a Plotly chart', () => {
      expect(subject.find(PlotlyEditor).length).toBe(0)
    })
  })

  describe('after load', () => {
    beforeEach(() => {
      subject = createSubject({ dataSources: chartDataSources, isLoading: false })
    })

    it('does not show full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toBe(0)
    })

    it('displays a Plotly chart with the provided data sources', () => {
      expect(subject.find(PlotlyEditor).props().dataSources).toBe(chartDataSources)
    })
  })

  describe('with empty dataSources', () => {
    beforeEach(() => {
      subject = createSubject({ dataSources: {} })
    })

    it('does not render a Plotly chart', () => {
      expect(subject.find(PlotlyEditor).length).toBe(0)
    })

    it('displays a message that data has not been loaded', () => {
      expect(subject.text()).toContain('Unable to load data')
    })
  })

  it('does not automatically execute the query when instructed not to', () => {
    const executeQuery = jest.fn()

    subject = createSubject({ shouldAutoExecuteQuery: false, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(0)
  })

  it('automatically executes the query when instructed to', () => {
    const executeQuery = jest.fn()

    subject = createSubject({ shouldAutoExecuteQuery: true, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(1)
  })

  describe('with dataSources', () => {
    const dataSources = {
      col1: [1, 2, 3],
      col2: [4, 5, 6]
    }

    beforeEach(() => {
      window.LOGO_URL = 'https://placekitten.com/530/530'
      window.MAPBOX_ACCESS_TOKEN = 'secret key'
      subject = createSubject({ dataSources: dataSources })
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

    it('automcatically updates the editor when dataSources change', () => {
      const newDataSources = {
        col1: [1, 2],
        col2: [3, 4]
      }

      subject.setProps({ dataSources: newDataSources })

      expect(subject.find(PlotlyEditor).props().dataSources).toBe(newDataSources)
    })

    it('converts data sources to options for editor', () => {
      expect(subject.find(PlotlyEditor).props().dataSourceOptions).toEqual([
        { value: 'col1', label: 'col1' },
        { value: 'col2', label: 'col2' }
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

  describe('when datasources are updated', () => {
    const dataSources = {
      col1: [1, 2, 3],
      col2: [4, 5, 6]
    }
    const plotlyData = [
      {
        type: 'scatter',
        mode: 'markers',
        x: [1, 2, 3],
        xsrc: 'col1',
        meta: { columnNames: { x: 'col1', y: 'col2' } },
        y: [4, 5, 6],
        ysrc: 'col2'
      }
    ]

    let setChartInformation

    beforeEach(() => {
      setChartInformation = jest.fn()
      subject = createSubject({ dataSources: dataSources, chart: { data: plotlyData, frames: [], layout: {} }, setChartInformation })
      setChartInformation.mockClear()
    })

    it('sets updated data for the chart', () => {
      const newDataSources = {
        col1: [1, 2],
        col2: [3, 4]
      }

      subject.setProps({ dataSources: newDataSources })

      expect(setChartInformation).toHaveBeenCalledTimes(1)
      const firstPlotData = plotlyData[0]
      const expected = { ...firstPlotData, ...{ x: newDataSources.col1, y: newDataSources.col2 } }
      expect(setChartInformation).toHaveBeenCalledWith({ data: [expected], layout: {}, frames: [] })
    })
  })

  describe('save chart', () => {
    it('sends a save chart event', () => {
      const setChartInformation = jest.fn()
      const subject = createSubject({ setChartInformation })
      setChartInformation.mockClear()

      const data = [{ x: [1, 2, 3], xsrc: 'col1' }]
      subject.find(PlotlyEditor).props().onUpdate(data, {}, [])

      expect(setChartInformation).toHaveBeenCalledTimes(1)
      expect(setChartInformation).toHaveBeenCalledWith({ data: data, layout: {}, frames: [] })
    })
  })
})

function createSubject (params = {}) {
  const defaultParams = {
    chart: { data: [], layout: {}, frames: [] },
    isLoading: false,
    dataSources: { data: ['sources'] },
    shouldAutoExecuteQuery: false,
    executeQuery: jest.fn(),
    setChartInformation: jest.fn()
  }
  const paramsWithDefaults = Object.assign({}, defaultParams, params)

  return shallow(<ChartView {...paramsWithDefaults} />)
}
