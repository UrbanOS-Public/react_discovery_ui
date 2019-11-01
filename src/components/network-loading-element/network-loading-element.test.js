import { shallow } from 'enzyme'
import NetworkLoadingElement from './network-loading-element'
import LoadingElement from '../generic-elements/loading-element'
import ErrorComponent from '../generic-elements/error-component'

describe('Network Loading Element', () => {
  it('shows the loading element when loading', () => {
    const subject = shallow(<NetworkLoadingElement networkLoading />)
    expect(subject.find(LoadingElement).length).toEqual(1)
    expect(subject.find(ErrorComponent).length).toEqual(0)
    expect(subject.find('network-loading-element').props().class).toEqual('')
  })

  it('shows the error element when network error occurs', () => {
    const subject = shallow(<NetworkLoadingElement hasNetworkError />)
    expect(subject.find(ErrorComponent).length).toEqual(1)
    expect(subject.find(LoadingElement).length).toEqual(0)
    expect(subject.find('network-loading-element').props().class).toEqual('')
  })

  it('renders nothing when not loading and there is no network error', () => {
    const subject = shallow(<NetworkLoadingElement />)
    expect(subject.find(ErrorComponent).length).toEqual(0)
    expect(subject.find(LoadingElement).length).toEqual(0)
    expect(subject.find('network-loading-element').props().class).toEqual('hidden')
  })

  it('renders only the network error when both properties are true', () => {
    const subject = shallow(<NetworkLoadingElement networkLoading hasNetworkError />)
    expect(subject.find(ErrorComponent).length).toEqual(1)
    expect(subject.find(LoadingElement).length).toEqual(0)
    expect(subject.find('network-loading-element').props().class).toEqual('')
  })
})
