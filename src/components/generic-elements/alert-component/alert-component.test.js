import { shallow } from 'enzyme'
import AlertComponent from './alert-component'
import Alert from 'react-bootstrap/Alert'

describe('alert-component', () => {
  let subject
  const fakeText = 'help there is an error and its your fault'
  const closeFunction = jest.fn()

  test('renders text based on props', () => {
    subject = shallow(<AlertComponent errorMessage={fakeText} showAlert={true} closeFunction={closeFunction}/>)
    expect(subject.find('.errorMessage').text()).toEqual(fakeText)
  })

  test('hides based on props', () => {
    subject = shallow(<AlertComponent errorMessage={fakeText} showAlert={false}  closeFunction={closeFunction}/>)
    expect(subject.find('.errorMessage').exists()).toBe(false)
  })

  test('fires closeFunction on close', () => {
    let mockClickHandler = jest.fn()
    subject = shallow(<AlertComponent errorMessage={fakeText} showAlert={true} closeFunction={mockClickHandler}/>)
    subject.find(Alert).prop('onClose')()
    expect(mockClickHandler).toHaveBeenCalledTimes(1)
  })

})
