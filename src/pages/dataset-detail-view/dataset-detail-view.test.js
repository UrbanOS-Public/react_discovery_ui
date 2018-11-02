import { shallow } from 'enzyme'
import DatasetView from './dataset-detail-view'
import DatasetDetails from '../../components/dataset-details'
import datasetStub from '../../../stubs/dataset-details-stub'

describe('dataset view', () => {
  let subject, expectedDataset, retrieveSpy

  beforeEach(() => {
    const routingProps = { params: { id: 1 } }
    expectedDataset = datasetStub
    retrieveSpy = jest.fn()
    subject = shallow(<DatasetView dataset={expectedDataset} retrieveDatasetDetails={retrieveSpy} match={routingProps} />)
  })

  it('calls retrieve data callback on mount', () => {
    expect(retrieveSpy).toHaveBeenCalled()
  })

  it('loads dataset details with dataset information', () => {
    expect(subject.find(DatasetDetails).props().dataset).toEqual(expectedDataset)
  })
})
