import { shallow } from 'enzyme'
import ErrorComponent from './error-component'

describe('data card element', () => {
  let subject, fakeText

  test('card to render text based on props', () => {
    fakeText = 'help there is an error and its your fault'
    subject = shallow(<ErrorComponent errorText={fakeText} />)
    expect(subject.find('.error-text').text()).toEqual(fakeText)
  })
})
