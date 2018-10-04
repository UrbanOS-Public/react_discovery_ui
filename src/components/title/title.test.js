import { shallow } from 'enzyme'
import Title from './title'

describe('Title', () => {
  let subject, expectedTitle

  beforeEach(() => {
    expectedTitle = 'some cool title'
    subject = shallow(<Title title={expectedTitle}/>)
  })

  test('displays title prop as text', () => {
    expect(subject.find('title-element').text()).toEqual(expectedTitle)
  })
})
