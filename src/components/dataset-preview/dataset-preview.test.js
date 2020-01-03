import {
  render,
  mount
} from 'enzyme'
import DatasetPreview from './dataset-preview'

describe('dataset preview', () => {
  describe('ui', () => {
    let subject
    beforeEach(() => {
      subject = render(<DatasetPreview datasetId={'12345'}
        retrieveDatasetPreview={
          jest.fn()
        }
        datasetPreview={
          {
            data: [{
              firstName: 'Joe',
              lastName: 'Smith',
              enrolled: true,
              'firstName.lastName': 'Joe Smith'
            }, {
              firstName: 'Jane',
              lastName: 'Doe',
              enrolled: false,
              'firstName.lastName': 'Jane Doe'
            }],
            meta: {
              columns: ['firstName', 'lastName', 'enrolled', 'firstName.lastName']
            }
          }
        }
      />)
    })

    test('should render table headers including column names with dots in them', () => {
      const tableHeaderSelector = '.rt-resizable-header-content'

      const headers = subject.find(tableHeaderSelector)
      const children = [...Array(4).keys()].map(x => headers.get(x).children[0].data)

      expect(children).toContain('firstName', 'lastName', 'enrolled', 'firstName.lastName')
    })

    test('should render table rows including data for column names with dots', () => {
      const tableElementSelector = '.rt-tr .rt-td'
      const table_elements = subject.find(tableElementSelector)
      const expected_rows = [
        ['Joe', 'Smith', 'true', 'Joe Smith'],
        ['Jane', 'Doe', 'false', 'Jane Doe']
      ]

      const actual_row1 = [0, 1, 2, 3].map(x => table_elements.get(x).children[0].data)
      const actual_row2 = [4, 5, 6, 7].map(x => table_elements.get(x).children[0].data)
      expect(actual_row1).toEqual(expected_rows[0])
      expect(actual_row2).toEqual(expected_rows[1])
    })
  })

  describe('mounting', () => {
    let retrieveDatasetPreviewMock
    beforeEach(() => {
      retrieveDatasetPreviewMock = jest.fn()
      mount(<DatasetPreview datasetId={'12345'}
        retrieveDatasetPreview={retrieveDatasetPreviewMock}
        datasetPreview={
          {
            data: [],
            meta: { columns: [] }
          }
        }
      />)
    })

    test('retrieveDatasetPreview should be called', () => {
      expect(retrieveDatasetPreviewMock).toBeCalled()
    })
  })
})
