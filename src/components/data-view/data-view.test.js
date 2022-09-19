import {
  mount
} from 'enzyme'
import DataView from './data-view'
import { Tab, TabPanel } from 'react-tabs'
import ReactTable from 'react-table'
import ReactJson from 'react-json-view'
import LoadingElement from '../../components/generic-elements/loading-element'

describe('data view', () => {
  describe('ui', () => {
    let subject
    beforeEach(() => {
      const data = [{
        firstName: 'Joe',
        lastName: 'Smith',
        enrolled: true,
        'firstName.lastName': 'Joe Smith'
      }, {
        firstName: 'Jane',
        lastName: 'Doe',
        enrolled: false,
        'firstName.lastName': 'Jane Doe'
      }]
      const columns = ['firstName', 'lastName', 'enrolled', 'firstName.lastName']
      subject = mount(<DataView data={data} columns={columns} />)
    })

    test('should render table headers including column names with dots in them', () => {
      const headers = subject.find('.rt-resizable-header-content')
      const actual = headers.map(x => x.text())

      expect(actual).toContain('firstName', 'lastName', 'enrolled', 'firstName.lastName')
    })

    test('should render table rows including data for column names with dots', () => {
      const table_elements = subject.find('.rt-tr .rt-td')
      const expected = [
        'Joe', 'Smith', 'true', 'Joe Smith',
        'Jane', 'Doe', 'false', 'Jane Doe'
      ]
      const actual = table_elements.map((x) => x.text())

      expect(actual).toContain(...expected)
    })

    test('should render two tabs', () => {
      expect(subject.find(Tab).length).toEqual(2)
    })

    it('has two tab panels', () => {
      expect(subject.find(TabPanel).length).toEqual(2)
    })

    it('has a react table component on the first tab, and it is shown by default', () => {
      expect(subject.find(ReactTable).length).toEqual(1)
    })

    it('has a react json component on the second tab', () => {
      subject.setState({ index: 1 })
      expect(subject.find(ReactJson).length).toEqual(1)
    })
  })

  describe('geojson', () => {
    let subject
    beforeEach(() => {
      const data = {}
      const columns = []
      subject = mount(<DataView data={data} columns={columns} format='geojson' />)
    })

    test('should render one tab', () => {
      expect(subject.find(Tab).length).toEqual(1)
    })

    it('has one tab panel', () => {
      expect(subject.find(TabPanel).length).toEqual(1)
    })

    it('does not have a react table component', () => {
      expect(subject.find(ReactTable).length).toEqual(0)
    })

    it('has a react json component on the first tab', () => {
      expect(subject.find(ReactJson).length).toEqual(1)
    })
  })

  describe('json loading', () => {
    let subject
    beforeEach(() => {
      const data = []
      const columns = ['firstName', 'lastName', 'enrolled', 'firstName.lastName']
      subject = mount(<DataView data={data} columns={columns} loading />)
      subject.setState({ index: 1 })
    })

    it('does not render a react json component', () => {
      expect(subject.find(ReactJson).length).toEqual(0)
    })

    it('does render a loading element', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })
  })

  describe('data table', () => {
    it('converts unrenderable values to strings only for the react table', () => {
      const queryData = [
        { object: { value: 1 }, boolean: true, array: [1], nan: NaN, null: null },
        { object: { value: 2 }, boolean: false, array: [2, 3], nan: NaN, null: null }
      ]
      const columns = ['object', 'boolean', 'array', 'nan', 'null']

      const subject = mount(<DataView data={queryData} columns={columns} />)

      const expectedData = [
        { object: '{\"value\":1}', boolean: 'true', array: '[1]', nan: '', null: '' },
        { object: '{\"value\":2}', boolean: 'false', array: '[2,3]', nan: '', null: '' }
      ]

      expect(subject.find(ReactTable).prop('data')).toEqual(expectedData)
      expect(subject.prop('data')).toEqual(queryData)
    })

    it('can handle column names with dots (.) by giving a custom accessor', () => {
      const queryData = [
        { 'first.name': 'Mark', 'last.name': 'Johnson' },
        { 'first.name': 'George', 'last.name': 'Lakoff' }
      ]
      const columns = [
        'first.name',
        'last.name'
      ]

      const subject = mount(<DataView data={queryData} columns={columns} />)

      const stringifyAccessor = column => {
        column.accessor = column.accessor.toString().replace(/\s/g, '')
        return column
      }

      const expectedColumns = [
        { Header: 'first.name', id: 'first.name', accessor: (row) => row[column], headerClassName: 'table-header' },
        { Header: 'last.name', id: 'last.name', accessor: (row) => row[column], headerClassName: 'table-header' }
      ]
      expectedColumns.map(stringifyAccessor)

      const actualColumns = subject.find(ReactTable).prop('columns').map(stringifyAccessor)

      expect(actualColumns).toEqual(expectedColumns)
    })
  })
})
