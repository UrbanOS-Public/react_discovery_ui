import { shallow } from 'enzyme'
import DatasetView from './dataset-detail-view'
import DatasetDetails from '../../components/dataset-details'
import datasetStub from '../../../stubs/dataset-details-stub'

describe('dataset view', () => {
  let subject, expectedDataset, retrieveSpy, clearDatasetDetailsSpy

  beforeEach(() => {
    const routingProps = { params: { id: 1 } }
    expectedDataset = datasetStub
    retrieveSpy = jest.fn()
    clearDatasetDetailsSpy = jest.fn()
    subject = shallow(<DatasetView dataset={expectedDataset} retrieveDatasetDetails={retrieveSpy} clearDatasetDetails={clearDatasetDetailsSpy} match={routingProps} />)
    // subject = shallow(<DatasetView dataset={expectedDataset} retrieveDatasetDetails={retrieveSpy} match={routingProps} />)
  })

  it('calls retrieve data callback on mount', () => {
    expect(retrieveSpy).toHaveBeenCalled()
  })

  it('loads dataset details with dataset information', () => {
    expect(subject.find(DatasetDetails).props().dataset).toEqual(expectedDataset)
  })

  it('clears dataset when unmounted to prevent caching issues especially with back space', () => {
    subject.unmount()

    expect(clearDatasetDetailsSpy).toHaveBeenCalled()
  })
})
