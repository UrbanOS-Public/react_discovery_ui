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

    expect(subject.find('.download-dataset').prop('href')).toMatch('/v1/api/dataset/12345/csv')
  })

  test('download dataset button triggers a download', () => {
    subject = shallow(<DatasetDetails dataset={{ tags: [{ name: 'COTA' }, { name: 'Transit Stops' }], id: '12345' }} />)
    expect(subject.find('.tag').filterWhere(n => { return n.text() === 'COTA' }).prop('href')).toMatch(encodeURI('/?facets[tags][]=COTA'))
  })
})
