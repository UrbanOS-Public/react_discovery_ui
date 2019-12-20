import { shallow } from 'enzyme'
import AlertComponent from './alert-component'

describe('data card element', () => {
  let subject, fakeText

  test('alert to render text based on props', () => {
    fakeText = 'help there is an error and its your fault'
    subject = shallow(<AlertComponent errorMessage={fakeText} />)
    expect(subject.find('.errorMessage').text()).toEqual(fakeText)
  }
  )
})
