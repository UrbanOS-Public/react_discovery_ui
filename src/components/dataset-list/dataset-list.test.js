import { shallow } from 'enzyme'
import DatasetList from './dataset-list'
import DatasetCard from '../data-card'
import expectedDatasetList from '../../../stubs/data-stub'

describe('dataset list view', () => {
  let subject

  beforeEach(() => {
    subject = shallow(<DatasetList datasets={expectedDatasetList} />)
  })

  it('displays the proper number of datacards based on datasets prop', () => {
    expect(subject.find(DatasetCard).length).toEqual(10)
  })
})
