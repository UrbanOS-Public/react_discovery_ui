import { shallow } from 'enzyme'
import DatasetListView from './dataset-list-view'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'

describe('dataset list view', () => {
  let expectedDatasetList, retrieveSpy, subject

  beforeEach(() => {
    expectedDatasetList = Array.from(Array(6)).map((unused, index) => ({ id: index }))
    retrieveSpy = jest.fn()
    subject = shallow(<DatasetListView datasets={expectedDatasetList} totalDatasets={12} retrieveDataset={retrieveSpy} />)
  })

  it('calls retrieve data callback on mount with page number 1 and default page size', () => {
    expect(retrieveSpy).toHaveBeenCalledWith({ page: 1, pageSize: 10 })
  })

  it('sets paginator total page count based on total datasets and page size', () => {
    const expectedNumberOfPages = 2 // 12 datasets with page size of 10
    expect(subject.find(Paginator).props().numberOfPages).toEqual(expectedNumberOfPages)
  })

  it('informs the paginator of the current page when the paginator invokes the callback', () => {
    subject.find(Paginator).props().pageChangeCallback(2)

    expect(subject.find(Paginator).props().currentPage).toEqual(2)
  })

  it('fetches data with the requested sort and returns to page one when sort order changed', () => {
    subject.find(Select).props().selectChangeCallback('name_desc')

    expect(retrieveSpy).toHaveBeenCalledWith({page: 1, pageSize: 10, sort: 'name_desc'})
  })

  it('fetches more data with the new page number and default page size', () => {
    subject.find(Paginator).props().pageChangeCallback(4)

    expect(retrieveSpy).toHaveBeenCalledWith({ page: 4, pageSize: 10 })
  })
})
