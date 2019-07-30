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

  describe('with a basic schema', () => {
    beforeEach(() => {
      subject = mount(<DatasetDictionary schema={basicSchema} expanded />)
    })

    it('has the correct table headers', () => {
      const table = subject.find('.dataset-schema-table')
      const headers = table.find('.rt-th')

      expect(headers.length).toBe(4)
      expect(headers.at(1).text()).toBe('Field')
      expect(headers.at(2).text()).toBe('Type')
      expect(headers.at(3).text()).toBe('Description')
    })

    it('has the correct table values', () => {
      const table = subject.find('.dataset-schema-table')
      const cells = table.find('.rt-td')

      const expansionPlaceholder = ''
      const expectedCellValues = [
        expansionPlaceholder, 'name', 'string', 'the name',
        expansionPlaceholder, 'age', 'integer', 'the age'
      ]
      expect(cells.length).toBe(expectedCellValues.length)
      expectedCellValues.forEach((expected, index) => {
        expect(cells.at(index).text()).toBe(expected)
      })
    })

    it('does not have pagination', () => {
      const table = subject.find(ReactTable)
      expect(table.props().showPagination).toBe(false)
    })

    it('has a page size to show the entire schema', () => {
      const table = subject.find(ReactTable)
      expect(table.props().defaultPageSize).toBe(Object.keys(basicSchema).length)
    })
  })

  describe('with a schema containing a list type', () => {
    it('displays the list type appropriately', () => {
      const schemaWithList = [
        { name: 'names', type: 'list', description: 'all the names', listType: 'string' }
      ]

      subject = mount(<DatasetDictionary schema={schemaWithList} expanded />)

      const table = subject.find('.dataset-schema-table')
      const cells = table.find('.rt-td')

      const typeIndex = 2;
      expect(cells.at(typeIndex).text()).toBe(`list of ${schemaWithList[0].listType}`)
    })
  })

  describe('with nested map subschemas', () => {
    const schemaWithMaps = [
      { name: 'name', type: 'string', description: 'the name' },
      {
        name: 'mother', type: 'map', description: 'the mother', subSchema: [
          { name: 'name', type: 'string', description: 'mother\'s name' },
          {
            name: 'children', type: 'list', description: 'the chillins', listType: 'map', subSchema: [
              { name: 'age', type: 'integer', description: 'the child\'s age' }
            ]
          }
        ]
      }
    ]

    var topLevelTable, topLevelCells

    beforeEach(() => {
      subject = mount(<DatasetDictionary schema={schemaWithMaps} expanded />)
      topLevelTable = subject.find('.dataset-schema-table')
      topLevelCells = topLevelTable.find('.rt-td')
    })

    it('has the correct table values', () => {
      const expansionPlaceholder = ''
      const expansionArrow = '▸'
      const expectedCellValues = [
        expansionPlaceholder, 'name', 'string', 'the name',
        expansionArrow, 'mother', 'map', 'the mother'
      ]
      expect(topLevelCells.length).toBe(expectedCellValues.length)
      expectedCellValues.forEach((expected, index) => {
        expect(topLevelCells.at(index).text()).toBe(expected)
      })
    })

    describe('with the map type expanded', () => {
      const expanderCellIndex = 4

      var subTable, subTableCells

      beforeEach(() => {
        topLevelCells.at(expanderCellIndex).simulate('click')
        topLevelTable = subject.find('.dataset-schema-table')

        subTable = topLevelTable.find('.dataset-schema-table.mother')
        subTableCells = subTable.find('.rt-td')
      })

      it('toggles the direction of the arrow', () => {
        expect(topLevelCells.at(expanderCellIndex).text()).toBe('▾')
      })

      it('renders a sub table for the map with correct values', () => {
        expect(subTable.length).toBe(1)
      })

      it('has the correct values in the sub table', () => {
        const expansionPlaceholder = ''
        const expansionArrow = '▸'
        const expectedCellValues = [
          expansionPlaceholder, 'name', 'string', 'mother\'s name',
          expansionArrow, 'children', 'list of map', 'the chillins'
        ]
        expect(subTableCells.length).toBe(expectedCellValues.length)
        expectedCellValues.forEach((expected, index) => {
          expect(subTableCells.at(index).text()).toBe(expected)
        })
      })

      it('toggles the direction of the arrow again when collapsed', () => {
        topLevelCells.at(expanderCellIndex).simulate('click')
        expect(topLevelCells.at(expanderCellIndex).text()).toBe('▸')
      })

      describe('and the list of map type expanded', () => {
        var subSubTable, subSubTableCells

        beforeEach(() => {
          subTableCells.at(expanderCellIndex).simulate('click')
          subTable = subject.find('.dataset-schema-table.mother')

          subSubTable = subTable.find('.dataset-schema-table.children')
          subSubTableCells = subSubTable.find('.rt-td')
        })

        it('renders another sub table for the list of maps with correct values', () => {
          expect(subSubTable.length).toBe(1)
        })

        it('has the correct values in the sub sub table', () => {
          const expansionPlaceholder = ''
          const expectedCellValues = [
            expansionPlaceholder, 'age', 'integer', 'the child\'s age'
          ]
          expect(subSubTableCells.length).toBe(expectedCellValues.length)
          expectedCellValues.forEach((expected, index) => {
            expect(subSubTableCells.at(index).text()).toBe(expected)
          })
        })
      })
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
