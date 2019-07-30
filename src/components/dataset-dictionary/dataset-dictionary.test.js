import { shallow, mount } from 'enzyme'
import DatasetDictionary from './dataset-dictionary'
import CollapsableBox from '../collapsable-box'
import ReactTable from 'react-table'

describe('dataset dictionary', () => {
  const basicSchema = [
    { name: 'name', type: 'string', description: 'the name' },
    { name: 'age', type: 'integer', description: 'the age' }
  ]

  var subject;

  describe('expanded with basic schema', () => {
    beforeEach(() => {
      subject = mount(<DatasetDictionary schema={basicSchema} expanded />)
    })

    it('has the correct table headers', () => {
      const table = subject.find('.dataset-schema-table')
      expect(table.text()).toMatch(/FieldTypeDescription/)
    })

    it('has the correct table values', () => {
      const table = subject.find('.dataset-schema-table')
      expect(table.text()).toMatch(/namestringthe nameageintegerthe age/)
    })

    it('does not have pagination', () => {
      const table = subject.find(ReactTable)
      expect(table.props().showPagination).toBe(false)
    })

    it('has a page size to show the entire schema', () => {
      const table = subject.find(ReactTable)
      expect(table.props().defaultPageSize).toBe(Object.keys(basicSchema).length)
    })

    it('does stuff', () => {
      const table = subject.find('.dataset-schema-table')
      // console.log(table.debug())
    })
  })

  describe('without a schema', () => {
    it('renders the collapsable box with an informative message', () => {
      subject = shallow(<DatasetDictionary />)

      const collapsableBox = subject.find(CollapsableBox)
      expect(collapsableBox.length).toBe(1)
      expect(collapsableBox.props().title).toBe("Data Dictionary Unavailable")
    })
  })

  it('is rendered in a collapsed box by default', () => {
    subject = shallow(<DatasetDictionary schema={basicSchema} />)

    const collapsableBox = subject.find(CollapsableBox)
    expect(collapsableBox.length).toBe(1)
    expect(collapsableBox.props().expanded).toBe(false)
  })
})
