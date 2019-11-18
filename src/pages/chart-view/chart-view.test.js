import { shallow } from 'enzyme'

import ChartView from './chart-view'
import PlotlyEditor from 'react-chart-editor'
import LoadingElement from '../../components/generic-elements/loading-element'

// Currently, shallow rendering is not compatible with React hooks.
// We've utilized a strategy found here https://blog.carbonfive.com/2019/08/05/shallow-testing-hooks-with-enzyme/
// which should become unneccessary in the near future
const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementationOnce(f => f())
}

describe('chart view', () => {
  const chartDataSources = { data: ['sources'] }

  let subject

  describe('before load', () => {
    beforeEach(() => {
      runUseEffect()
      subject = createSubject({isLoading: true})
    })

    it('shows full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toBe(1)
    })

    it('does not display a chart visualization', () => {
      expect(subject.find(PlotlyEditor).length).toBe(0)
    })
  })

  describe('after load', () => {
    beforeEach(() => {
      runUseEffect()

      subject = createSubject({dataSources: chartDataSources, isLoading: false})
    })

    it('does not show full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toBe(0)
    })

    it('displays a chart visualization with the provided data sources', () => {
      expect(subject.find(PlotlyEditor).props().dataSources).toBe(chartDataSources)
    })
  })

  describe('with empty dataSources', () => {
    beforeEach(() => {
      subject = createSubject({dataSources: {}})
    })

    it('does not render a chart editor', () => {
      expect(subject.find(PlotlyEditor).length).toBe(0)
    })

    it('displays a message that data has not been loaded', () => {
      expect(subject.text()).toContain('Unable to load data')
    })
  })

  it('does not automatically execute the query when instructed not to', () => {
    runUseEffect();
    const executeQuery = jest.fn()

    subject = createSubject({ autoFetchQuery: false, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(0)
  })

  it('automatically executes the query when instructed to', () => {
    runUseEffect();
    const executeQuery = jest.fn()

    subject = createSubject({ autoFetchQuery: true, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(1)
  })
})

function createSubject(params = {}) {
  const defaultParams = {
    isLoading: false,
    dataSources: { data: ["sources"] },
    autoFetchQuery: false,
    executeQuery: jest.fn()
  }
  const paramsWithDefaults = Object.assign({}, defaultParams, params)

  return shallow(<ChartView
    isLoading={paramsWithDefaults.isLoading}
    dataSources={paramsWithDefaults.dataSources}
    autoFetchQuery={paramsWithDefaults.autoFetchQuery}
    executeQuery={paramsWithDefaults.executeQuery}
  />)
}
