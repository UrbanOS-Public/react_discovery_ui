import { shallow, mount } from 'enzyme'
import DatasetDictionary from './dataset-dictionary'
import CollapsableBox from '../collapsable-box'
import Tooltip from '../tooltip'

describe('dataset dictionary', () => {
  const basicSchema = [
    { name: 'name', type: 'string', description: 'the name' },
    { name: 'age', type: 'integer', description: 'the age' }
  ]

  let subject

  describe('with a basic schema', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: true
        }))
      })
      subject = mount(<DatasetDictionary schema={basicSchema} expanded />)
    })

    it('has the correct table headers', () => {
      const table = subject.find('.dataset-schema-table')
      const headers = table.find('th')

      expect(headers.length).toBe(3)
      expect(headers.at(0).text()).toBe('Field')
      expect(headers.at(1).text()).toBe('Type')
      expect(headers.at(2).text()).toBe('Description')
    })

    it('has the correct table values', () => {
      const table = subject.find('.dataset-schema-table')
      const cells = table.find('td')

      const expectedCellValues = [
        'name', 'string', 'the name',
        'age', 'integer', 'the age'
      ]
      expect(cells.length).toBe(expectedCellValues.length)
      expectCorrectCellValues(expectedCellValues, cells)
    })

    it('does not have pagination controls', () => {
      expect(subject.find('.pagination').length).toBe(0)
    })

    it('is sortable via column headers', () => {
      const headers = subject.find('.dataset-schema-table th')
      expect(headers.at(0).prop('onClick')).toBeTruthy()
    })

    it('has no left margin on the top-level table', () => {
      const tableWrapper = subject.find('.dataset-schema-table').first()
      expect(tableWrapper.prop('style')).toBeFalsy()
    })
  })

  describe('with a schema containing a list type', () => {
    it('displays the list type appropriately', () => {
      const schemaWithList = [
        { name: 'names', type: 'list', description: 'all the names', itemType: 'string' }
      ]

      subject = mount(<DatasetDictionary schema={schemaWithList} expanded />)

      const table = subject.find('.dataset-schema-table')
      const cells = table.find('td')

      const typeIndex = 1
      expect(cells.at(typeIndex).text()).toBe(`list of ${schemaWithList[0].itemType}`)
    })
  })

  describe('with nested map subschemas', () => {
    const schemaWithMaps = [
      { name: 'name', type: 'string', description: 'the name' },
      {
        name: 'mother',
        type: 'map',
        description: 'the mother',
        subSchema: [
          { name: 'name', type: 'string', description: 'mother\'s name' },
          {
            name: 'children',
            type: 'list',
            description: 'the chillins',
            itemType: 'map',
            subSchema: [
              { name: 'age', type: 'integer', description: 'the child\'s age' }
            ]
          }
        ]
      }
    ]

    let topLevelTable, topLevelCells

    beforeEach(() => {
      subject = mount(<DatasetDictionary schema={schemaWithMaps} expanded />)
      topLevelTable = subject.find('.dataset-schema-table')
      topLevelCells = topLevelTable.find('td')
    })

    it('has the correct table values', () => {
      const expectedCellValues = [
        'name', 'string', 'the name',
        'mother', 'map', 'the mother'
      ]
      expect(topLevelCells.length).toBe(expectedCellValues.length)
      expectCorrectCellValues(expectedCellValues, topLevelCells)
      expect(topLevelTable.find('.field-expander-button').at(0).text()).toBe('▸')
    })

    describe('with the map type expanded', () => {
      let subTable, subTableCells

      beforeEach(() => {
        topLevelTable.find('.field-expander-button').at(0).simulate('click')
        topLevelTable = subject.find('.dataset-schema-table')

        subTable = topLevelTable.find('.dataset-schema-table.mother')
        subTableCells = subTable.find('td')
      })

      it('toggles the direction of the arrow', () => {
        expect(topLevelTable.find('.field-expander-button').at(0).text()).toBe('▾')
      })

      it('renders a sub table for the map with correct values', () => {
        expect(subTable.length).toBe(1)
      })

      it('has the correct values in the sub table', () => {
        const expectedCellValues = [
          'name', 'string', 'mother\'s name',
          'children', 'list of map', 'the chillins'
        ]
        expect(subTableCells.length).toBe(expectedCellValues.length)
        expectCorrectCellValues(expectedCellValues, subTableCells)
        expect(subTable.find('.field-expander-button').at(0).text()).toBe('▸')
      })

      it('indents the sub table', () => {
        expect(subTable.prop('style').marginLeft).toBe('35px')
      })

      it('toggles the direction of the arrow again when collapsed', () => {
        topLevelTable.find('.field-expander-button').at(0).simulate('click')
        expect(subject.find('.dataset-schema-table').find('.field-expander-button').at(0).text()).toBe('▸')
      })

      describe('and the list of map type expanded', () => {
        let subSubTable, subSubTableCells

        beforeEach(() => {
          subTable.find('.field-expander-button').at(0).simulate('click')
          subTable = subject.find('.dataset-schema-table.mother')

          subSubTable = subTable.find('.dataset-schema-table.children')
          subSubTableCells = subSubTable.find('td')
        })

        it('renders another sub table for the list of maps with correct values', () => {
          expect(subSubTable.length).toBe(1)
        })

        it('has the correct values in the sub sub table', () => {
          const expectedCellValues = [
            'age', 'integer', 'the child\'s age'
          ]
          expect(subSubTableCells.length).toBe(expectedCellValues.length)
          expectCorrectCellValues(expectedCellValues, subSubTableCells)
        })
      })
    })
  })

  describe('with a map missing its subschema', () => {
    const schemaWithMaps = [
      { name: 'name', type: 'string', description: 'the name' },
      {
        name: 'mother', type: 'map', description: 'the mother'
      }
    ]

    let topLevelTable

    beforeEach(() => {
      subject = mount(<DatasetDictionary schema={schemaWithMaps} expanded />)
      topLevelTable = subject.find('.dataset-schema-table')
      const expanderButtons = topLevelTable.find('.field-expander-button')
      expanderButtons.at(0).simulate('click')
      topLevelTable = subject.find('.dataset-schema-table')
    })

    it('displays an informative message', () => {
      const messageDiv = topLevelTable.find('.error')
      expect(messageDiv.text()).toBe('Schema information not found. Contact the data curator.')
    })
  })

  describe('without a schema', () => {
    beforeEach(() => {
      subject = shallow(<DatasetDictionary expanded />)
    })

    it('renders the collapsable box with an informative message', () => {
      const collapsableBox = subject.find(CollapsableBox)
      expect(collapsableBox.length).toBe(1)
      expect(collapsableBox.props().title).toBe('Data Dictionary Unavailable')
    })

    it('does not render the table', () => {
      expect(subject.find('.dataset-schema-table').length).toBe(0)
    })

    it('does not render the view link', () => {
      expect(subject.find('.view-link a').length).toBe(0)
    })
  })

  describe('with an empty schema', () => {
    beforeEach(() => {
      subject = mount(<DatasetDictionary schema={[]} expanded />)
    })

    it('renders the collapsable box with an informative message', () => {
      const collapsableBox = subject.find(CollapsableBox)
      expect(collapsableBox.length).toBe(1)
      expect(collapsableBox.props().title).toBe('Data Dictionary Unavailable')
    })

    it('does not render the table', () => {
      expect(subject.find('.dataset-schema-table').length).toBe(0)
    })

    it('does not render the view link', () => {
      expect(subject.find('.view-link a').length).toBe(0)
    })
  })

  it('is rendered in an expanded box by default', () => {
    subject = shallow(<DatasetDictionary schema={basicSchema} />)

    const collapsableBox = subject.find(CollapsableBox)
    expect(collapsableBox.length).toBe(1)
    expect(collapsableBox.props().expanded).toBe(true)
  })

  it('renders a view link', () => {
    window.DISC_API_URL = 'http://right.here.com'
    subject = mount(<DatasetDictionary schema={basicSchema} datasetId='all-the-datas' />)

    const link = subject.find('.view-link a')
    expect(link.props().href).toBe(`${window.DISC_API_URL}/api/v1/dataset/all-the-datas/dictionary`)
  })

  const expectCorrectCellValues = (expectedCellValues, cells) => {
    expectedCellValues.forEach((expected, index) => {
      if (index % 3 === 0) { // handle special rendering for field name tooltip
        expect(cells.at(index).find(Tooltip).props().text).toBe(expected)
      } else {
        expect(cells.at(index).text()).toBe(expected)
      }
    })
  }
})
