import { shallow } from 'enzyme'
import Count from './count'

describe('Count', () => {
  let subject, expectedCount

  beforeEach(() => {
    expectedCount = '3'
    subject = shallow(<Count data={expectedCount}/>)
  })

  test('displays count prop', () => {
    expect(subject.find('count-element').text()).toEqual(expectedCount)
  })
  //this test is an example of how to test an updated prop.
  //in practice this is probably too trivial to test
  test('updates count if prop is updated', () => {
    let newCount = '10'
    subject.setProps({ data: newCount })
    expect(subject.find('count-element').text()).toEqual(newCount)
  })
})
