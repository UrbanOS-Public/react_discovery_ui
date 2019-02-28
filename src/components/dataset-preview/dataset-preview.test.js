import {
  render,
  mount
} from 'enzyme'
import DatasetPreview from './dataset-preview'

describe('dataset preview', () => {
  describe('ui', () => {
    let subject
    beforeEach(() => {
      subject = render(<DatasetPreview dataset_id={
        '12345'
      }
        retrieveDatasetPreview={
          jest.fn()
        }
        datasetPreview={
          {
            data: [{
              firstName: 'Joe',
              lastName: 'Smith'
            }, {
              firstName: 'Jane',
              lastName: 'Doe'
            }]
          }
        }
      />)
    })

    test('should render table headers', () => {
      const tableHeaderSelector = '.rt-resizable-header-content'
      expect(subject.find(tableHeaderSelector).get(0).children[0].data).toEqual('firstName')
      expect(subject.find(tableHeaderSelector).get(1).children[0].data).toEqual('lastName')
      expect(subject.find(tableHeaderSelector).length).toEqual(2)
    })

    test('should render table rows', () => {
      const tableElementSelector = '.rt-tr .rt-td'
      expect(subject.find(tableElementSelector).get(0).children[0].data).toEqual('Joe')
      expect(subject.find(tableElementSelector).get(1).children[0].data).toEqual('Smith')

      expect(subject.find(tableElementSelector).get(2).children[0].data).toEqual('Jane')
      expect(subject.find(tableElementSelector).get(3).children[0].data).toEqual('Doe')
    })

    test('download dataset button triggers a download', () => {
      expect(subject.find('.download-dataset').prop('href')).toMatch('/v1/api/dataset/12345/csv')
    })
  })

  describe('mounting', () => {
    let subject, retrieveDatasetPreviewMock
    beforeEach(() => {
      retrieveDatasetPreviewMock = jest.fn()
      subject = mount(<DatasetPreview dataset_id={
        '12345'
      }
        retrieveDatasetPreview={
          retrieveDatasetPreviewMock
        }
        datasetPreview={
          {
            data: []
          }
        }
      />)
    })

    test('retrieveDatasetPreview should be called', () => {
      expect(retrieveDatasetPreviewMock).toBeCalled()
    })
  })
})
