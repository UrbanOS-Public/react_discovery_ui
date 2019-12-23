import { shallow } from 'enzyme'
import AlertComponent from './alert-component'
import { createStore, applyMiddleware } from 'redux'
import { setGlobalErrorState } from '../../../store/actions'
import Alert from 'react-bootstrap/Alert'

describe('alert-component', () => {
  let subject
  const fakeText = 'help there is an error and its your fault'
  const reducer = (state = [], action) => {
    return [...state, action]
  }
  let store

  beforeEach(() => {
    store = createStore(reducer)
  })

  test('renders text based on props', () => {
    subject = shallow(<AlertComponent errorMessage={fakeText} showAlert={true}/>)
    expect(subject.find('.errorMessage').text()).toEqual(fakeText)
  })

  test('hides based on props', () => {
    subject = shallow(<AlertComponent errorMessage={fakeText} showAlert={false}/>)
    expect(subject.find('.errorMessage').exists()).toBe(false)
  })

  test('fires closeFunction on close', () => {
    let mockClickHandler = jest.fn()
    subject = shallow(<AlertComponent errorMessage={fakeText} showAlert={true} closeFunction={mockClickHandler}/>)
    console.log(subject.find(Alert))
    subject.find(Alert).prop('onClose')()
    expect(mockClickHandler).toHaveBeenCalledTimes(1)
  })

})
