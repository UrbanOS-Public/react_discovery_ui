import {
  mount
} from 'enzyme'
import DatasetPreview from './dataset-preview'

describe('dataset preview', () => {
  describe('mounting', () => {
    let retrieveDatasetPreviewMock
    beforeEach(() => {
      const matchMedia = jest.fn()
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: true
        }))
      })
      retrieveDatasetPreviewMock = jest.fn()
      mount(<DatasetPreview
        datasetId='12345'
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
