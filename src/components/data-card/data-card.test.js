import { shallow } from 'enzyme'
import DataCard from './data-card'

describe('data card element', () => {
  let subject

  test('card to render text based on props', () => {
    subject = shallow(<DataCard title={'someTitle'} description={'somedescription'} fileTypes={['foo', 'bar']} />)
    expect(subject.find('.title').text()).toEqual('someTitle')
    expect(subject.find('.description').text()).toEqual('somedescription')
    expect(subject.find('.file-type').length).toEqual(2)
  })
})
