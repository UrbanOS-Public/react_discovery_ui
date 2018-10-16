import { shallow } from 'enzyme'
import DatasetDetails from './dataset-details'

describe('data card element', () => {
  let subject

  test('card to render text based on props', () => {
    subject = shallow(<DatasetDetails dataset={{ tags: ['COTA', 'Transit Stops'] }} />)
    expect(subject.find('.tag').length).toEqual(2)
  })
})
