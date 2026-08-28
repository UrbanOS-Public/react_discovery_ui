import {
  mount
} from 'enzyme'
import DataView from './data-view'
import { Tab, TabPanel } from 'react-tabs'
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
      const headers = subject.find('#data-view-table th')
      const actual = headers.map(x => x.text())

      expect(actual).toContain('firstName', 'lastName', 'enrolled', 'firstName.lastName')
    })

    test('should render table rows including data for column names with dots', () => {
      const rowHeaders = subject.find('#data-view-table tbody .row-header').map(x => x.text())
      const dataCells = subject.find('#data-view-table tbody td').map(x => x.text())
      const actual = [...rowHeaders, ...dataCells]

      expect(actual).toContain('Joe')
      expect(actual).toContain('Smith')
      expect(actual).toContain('true')
      expect(actual).toContain('Jane')
      expect(actual).toContain('Doe')
      expect(actual).toContain('false')
    })

    test('should render two tabs', () => {
      expect(subject.find(Tab).length).toEqual(2)
    })

    it('has two tab panels', () => {
      expect(subject.find(TabPanel).length).toEqual(2)
    })

    it('has a data table on the first tab, and it is shown by default', () => {
      expect(subject.find('#data-view-table table').length).toEqual(1)
    })

    it('has a react json component on the second tab', () => {
      subject.find('[data-testid="data-json"]').first().simulate('click')
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

    it('does not have a data table component', () => {
      expect(subject.find('#data-view-table').length).toEqual(0)
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
      subject.find('[data-testid="data-json"]').first().simulate('click')
    })

    it('does not render a react json component', () => {
      expect(subject.find(ReactJson).length).toEqual(0)
    })

    it('does render a loading element', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })
  })

  describe('data table', () => {
    it('converts unrenderable values to strings for the data table', () => {
      const queryData = [
        { object: { value: 1 }, boolean: true, array: [1], nan: NaN, null: null },
        { object: { value: 2 }, boolean: false, array: [2, 3], nan: NaN, null: null }
      ]
      const columns = ['object', 'boolean', 'array', 'nan', 'null']

      const subject = mount(<DataView data={queryData} columns={columns} />)

      const rowHeaders = subject.find('#data-view-table tbody .row-header').map(c => c.text())
      const dataCells = subject.find('#data-view-table tbody td').map(c => c.text())
      expect(rowHeaders).toEqual(['{"value":1}', '{"value":2}'])
      expect(dataCells).toEqual(['true', '[1]', '', '', 'false', '[2,3]', '', ''])
      expect(subject.prop('data')).toEqual(queryData)
    })

    it('can handle column names with dots (.) by rendering correct cell values', () => {
      const queryData = [
        { 'first.name': 'Mark', 'last.name': 'Johnson' },
        { 'first.name': 'George', 'last.name': 'Lakoff' }
      ]
      const columns = [
        'first.name',
        'last.name'
      ]

      const subject = mount(<DataView data={queryData} columns={columns} />)

      const headers = subject.find('#data-view-table th').map(h => h.text())
      expect(headers).toContain('first.name')
      expect(headers).toContain('last.name')

      const rowHeaders = subject.find('#data-view-table tbody .row-header').map(c => c.text())
      const dataCells = subject.find('#data-view-table tbody td').map(c => c.text())
      const allCells = [...rowHeaders, ...dataCells]
      expect(allCells).toContain('Mark')
      expect(allCells).toContain('Johnson')
      expect(allCells).toContain('George')
      expect(allCells).toContain('Lakoff')
    })
  })
})
