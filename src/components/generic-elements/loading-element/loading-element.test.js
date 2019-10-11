import { shallow } from 'enzyme'
import LoadingElement from './loading-element'

describe('data card element', () => {
  let subject

  test('card to render text based on props', () => {
    subject = shallow(<LoadingElement />)
    expect(subject.find('loading-element').length).toEqual(1)
  })
})
