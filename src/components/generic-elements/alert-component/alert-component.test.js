import { mount } from 'enzyme'
import AlertComponent from './alert-component'
import Snackbar from '@material-ui/core/Snackbar';

describe('alert-component', () => {
  let subject
  const fakeText = 'help there is an error and its your fault'
  const closeFunction = jest.fn()

  test('renders text based on props', () => {
    subject = mount(<AlertComponent errorMessage={fakeText} showAlert={true} closeFunction={closeFunction}/>)
    expect(subject.find('.errorMessage').text()).toEqual(fakeText)
  })

  test('hides based on props', () => {
    subject = mount(<AlertComponent errorMessage={fakeText} showAlert={false}  closeFunction={closeFunction}/>)
    expect(subject.find('.errorMessage').exists()).toBe(false)
  })

  test('fires closeFunction on close', () => {
    let mockClickHandler = jest.fn()
    subject = mount(<AlertComponent errorMessage={fakeText} showAlert={true} closeFunction={mockClickHandler}/>)
    subject.find(Snackbar).prop('onClose')()
    expect(mockClickHandler).toHaveBeenCalledTimes(1)
  })

})
