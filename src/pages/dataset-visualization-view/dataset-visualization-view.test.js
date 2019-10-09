import { shallow } from 'enzyme'

import DatasetVisualizationView from './dataset-visualization-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import { Collapse } from 'react-collapse'
import DatasetQuery from '../../components/dataset-query';
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
  const dataSources = { data: ['sources'] }

  let subject

  describe('before load', () => {
    beforeEach(() => {
      runUseEffect()
      subject = shallow(
        <DatasetVisualizationView
          queryData={[]}
          isQueryLoading={true}
          match={routerProps}
          location={{ search: `?systemName=${tableName}` }}
          dataSources={dataSources} />
      )
    })

    it('shows full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })

  })

  describe('after load', () => {
    beforeEach(() => {
      runUseEffect()

      subject = shallow(
        <DatasetVisualizationView
          isLoading={false}
          match={routerProps}
          location={{ search: `?systemName=${tableName}` }}
          dataSources={dataSources} />
      )
    })



    it('does not show full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toEqual(0)
    })

    it('displays a chart visualization with the provided data sources', () => {
      expect(subject.find(ChartVisualization).props().dataSources).toEqual(dataSources)
    })

    it('displays a chart header with an initially collapsed toggle', () => {
      expect(subject.find(Collapse).props().isOpened).toEqual(false)
    })

  })

  test('when user has submitted query, full page loading should not render', () => {
    runUseEffect()

    subject = shallow(
      <DatasetVisualizationView
        isLoading={false}
        match={routerProps}
        location={{ search: `?systemName=${tableName}` }}
        dataSources={dataSources} />
    )

    subject.setProps({ isLoading: true })
    subject.setProps({ queryData: { data: 1 } })

    expect(subject.find(LoadingElement).length).toEqual(0)
  })
})
