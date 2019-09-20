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
  let queryCallback

  describe('before load', () => {
    beforeEach(() => {
      runUseEffect()
      queryCallback = jest.fn()
      subject = shallow(
        <DatasetVisualizationView
          isLoading={true}
          match={routerProps}
          location={{ search: `?systemName=${tableName}` }}
          onQueryDataset={queryCallback}
          dataSources={dataSources} />
      )
    })

    it('shows full page loading icon', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })

    test('calls the submit handler on component mounting', () => {
      expect(queryCallback).toHaveBeenCalledWith(expectedQuery)
    })
  })

  describe('after load', () => {
    beforeEach(() => {
      runUseEffect()
      queryCallback = jest.fn()

      subject = shallow(
        <DatasetVisualizationView
          isLoading={false}
          match={routerProps}
          location={{ search: `?systemName=${tableName}` }}
          onQueryDataset={queryCallback}
          dataSources={dataSources} />
      )
    })

    test('sets the default query to use the systemName', () => {
      expect(subject.find(DatasetQuery).props().defaultQuery).toEqual(expectedQuery)
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

    describe('onQueryDataset handler', () => {
      const newText = 'SELECT * FROM great_org__awesome_dataset LIMIT 55'

      beforeEach(() => {
        subject.find(DatasetQuery).props().onQueryDataset(newText)
      })

      test('runs query', () => {
        expect(queryCallback).toHaveBeenCalledWith(newText)
      })

      test('sets hasUserSubmittedQuery to true', () => {
        const actual = subject.find(DatasetQuery).props().hasUserSubmittedQuery
        expect(actual).toBeTruthy()
      })

      test('once hasUserSubmittedQuery has been set to true it stays true', () => {
        subject.find(DatasetQuery).props().onQueryDataset(newText)

        const actual = subject.find(DatasetQuery).props().hasUserSubmittedQuery
        expect(actual).toBeTruthy()
      })
    })
  })

  test('when user has submitted query, full page loading should not render', () => {
    runUseEffect()
    queryCallback = jest.fn()

    subject = shallow(
      <DatasetVisualizationView
        isLoading={false}
        match={routerProps}
        location={{ search: `?systemName=${tableName}` }}
        onQueryDataset={queryCallback}
        dataSources={dataSources} />
    )

    subject.find(DatasetQuery).props().onQueryDataset('SELECT * FROM sky')
    subject.setProps({ isLoading: true })

    expect(subject.find(LoadingElement).length).toEqual(0)
  })
})
