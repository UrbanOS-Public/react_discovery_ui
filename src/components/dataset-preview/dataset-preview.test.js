import {
  mount
} from 'enzyme'
import DatasetPreview from './dataset-preview'

describe('dataset preview', () => {
  describe('ui', () => {
    let subject
    beforeEach(() => {
      subject = mount(<DatasetPreview datasetId={'12345'}
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
