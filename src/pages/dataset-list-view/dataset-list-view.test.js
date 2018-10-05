import { mount } from 'enzyme'
import DatasetListView from './dataset-list-view'
import dataStub from '../../../stubs/data-stub'

describe('dataset list view', () => {
  let subject, expectedDatasetList, retrieveSpy

  beforeEach(() => {
    expectedDatasetList = dataStub
    retrieveSpy = jest.fn()
    subject = mount(<DatasetListView datasets={expectedDatasetList} retrieveDataset={retrieveSpy} />)
  })

  it('displays info for a data item', () => {
    expect(subject.find('data-card').length).toEqual(10)
  })

  it('calls retrieve data callback on mount', () => {
    expect(retrieveSpy).toHaveBeenCalled()
  })

  it('displays loading component if there are no datasets', () => {
    subject.setProps({ datasets: [] })
    expect(subject.find('loading-element').length).toEqual(1)
    expect(subject.find('data-card').length).toEqual(0)
  })

  it('displays error component but not data cards if dataset error prop is true', () => {
    subject.setProps({ displayNetworkError: true })
    expect(subject.find('error-component').length).toEqual(1)
    expect(subject.find('data-card').length).toEqual(0)
  })
})
