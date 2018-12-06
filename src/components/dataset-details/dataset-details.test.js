import { shallow } from 'enzyme'
import DatasetDetails from './dataset-details'

describe('data card element', () => {
  let subject

  test('card to render text based on props', () => {
    subject = shallow(<DatasetDetails dataset={{ tags: [{ name: 'COTA' }, { name: 'Transit Stops' }] }} />)
    expect(subject.find('.tag').length).toEqual(2)
  })

  test('card to render text based on props', () => {
    subject = shallow(<DatasetDetails dataset={{ tags: null }} />)
    expect(subject.find('.tags').length).toEqual(0)
  })
})
