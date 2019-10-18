import { shallow } from 'enzyme'

import ChartView from './chart-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import LoadingElement from '../../components/generic-elements/loading-element'

const tableName = 'org1__table2'
const expectedQuery = `SELECT * FROM ${tableName}\nLIMIT 20000`

// Currently, shallow rendering is not compatible with React hooks.
// We've utilized a strategy found here https://blog.carbonfive.com/2019/08/05/shallow-testing-hooks-with-enzyme/
// which should become unneccessary in the near future
const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementationOnce(f => f())
}

describe('dataset visualization view', () => {
  const routerProps = {
    params: {
      organizationName: 'data \'r\' us',
      datasetName: 'some data'
    }
  }
  const chartDataSources = { data: ['sources'] }

  let subject

  describe('before load', () => {
    beforeEach(() => {
      runUseEffect()
      subject = createSubject({isQueryLoading: true})
    })

    it('shows full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toBe(1)
    })

    it('does not display a chart visualization', () => {
      expect(subject.find(ChartVisualization).length).toBe(0)
    })
  })

  describe('after load', () => {
    beforeEach(() => {
      runUseEffect()

      subject = createSubject({dataSources: chartDataSources, isQueryLoading: false})
    })

    it('does not show full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toBe(0)
    })

    it('displays a chart visualization with the provided data sources', () => {
      expect(subject.find(ChartVisualization).props().dataSources).toBe(chartDataSources)
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
    isQueryLoading: false,
    dataSources: { data: ["sources"] },
    autoFetchQuery: false,
    executeQuery: jest.fn()
  }
  const paramsWithDefaults = Object.assign({}, defaultParams, params)

  return shallow(<ChartView
    isQueryLoading={paramsWithDefaults.isQueryLoading}
    dataSources={paramsWithDefaults.dataSources}
    autoFetchQuery={paramsWithDefaults.autoFetchQuery}
    executeQuery={paramsWithDefaults.executeQuery}
  />)
}
