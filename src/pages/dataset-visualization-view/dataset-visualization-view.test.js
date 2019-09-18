import { shallow } from 'enzyme'

import DatasetVisualizationView from './dataset-visualization-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import { Collapse } from 'react-collapse'
import DatasetQuery from '../../components/dataset-query';
import isLoadingElement from '../../components/network-loading-element'

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
      queryCallback = jest.fn()
      subject = shallow(
        <DatasetVisualizationView
          isLoading={true}
          match={routerProps}
          location={{ search: {} }}
          onQueryDataset={queryCallback}
          dataSources={dataSources} />
      )
    })

    it('shows full page loading icon', () => {
      expect(subject.find(isLoadingElement).length).toEqual(1)
    })

    test('calls the submit handler on component mounting', () => {
      expect(queryCallback).toHaveBeenCalledWith('SELECT * FROM org1__table2\nLIMIT 20000')
    })
  })

  describe('after load', () => {
    const tableName = 'org1__table2'

    beforeEach(() => {
      queryCallback = jest.fn()

      subject = shallow(
        <DatasetVisualizationView
          isLoading={false}
          match={routerProps}
          location={{ search: {} }}
          onQueryDataset={queryCallback}
          dataSources={dataSources} />
      )
    })

    test('sets the default query to use the systemName', () => {
      expect(subject.find(DatasetQuery).props().defaultQuery).toEqual(`SELECT * FROM ${tableName}\nLIMIT 20000`)
    })

    it('does not show full page loading icon', () => {
      expect(subject.find(isLoadingElement).length).toEqual(0)
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
    })
  })
})
