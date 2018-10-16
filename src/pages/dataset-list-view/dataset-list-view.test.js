import { shallow } from 'enzyme'
import DatasetListView from './dataset-list-view'
import dataStub from '../../../stubs/data-stub'

describe('dataset list view', () => {
  let expectedDatasetList, retrieveSpy

  beforeEach(() => {
    expectedDatasetList = dataStub
    retrieveSpy = jest.fn()
    shallow(<DatasetListView datasets={expectedDatasetList} retrieveDataset={retrieveSpy} />)
  })

  it('calls retrieve data callback on mount', () => {
    expect(retrieveSpy).toHaveBeenCalled()
  })
})
