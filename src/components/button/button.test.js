import { shallow } from 'enzyme'
import Button from './button'

describe('App', () => {

  //this test is an example of how to spy on a function
  //and test that it was called
  test('calls callback function on click', () => {
    let clickSpy = jest.fn()
    let subject = shallow(<Button action={clickSpy} buttonText={"👸🏻"}/>)
    subject.find('button').simulate('click',{})
    expect(clickSpy).toHaveBeenCalled()
  })
})
