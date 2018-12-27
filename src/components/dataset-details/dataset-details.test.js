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

  test('download dataset button triggers a download', () => {
    subject = shallow(<DatasetDetails dataset={{ tags: null, id: '12345' }} />)

    expect(subject.find('.download-dataset').prop('href')).toEqual(expect.stringMatching(new RegExp('/v1/api/dataset/12345/csv')))
  })
})
