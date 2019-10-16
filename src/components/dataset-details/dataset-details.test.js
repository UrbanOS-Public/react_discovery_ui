import { shallow } from 'enzyme'
import DatasetDetails from './dataset-details'

const ingestDataset = {
  id: '123',
  name: 'COTA Streaming Busses',
  description: '....',
  sourceType: 'ingest',
  sourceFormat: 'csv',
  sourceUrl: 'http://example.com/sweet-data.csv',
  organization: {
    name: "The best in the wolrd"
  }
}

describe('data card element', () => {
  let subject

  test('card to render text based on props', () => {
    subject = shallow(<DatasetDetails dataset={{ keywords: ['COTA', 'Transit Stops'] }} />)
    expect(subject.find('.keyword').length).toEqual(2)
  })

  test('card does not render keywords when not provided', () => {
    subject = shallow(<DatasetDetails dataset={{ keywords: null }} />)
    expect(subject.find('.keyword').length).toEqual(0)
  })

  test('card does not render keywords label when empty', () => {
    subject = shallow(<DatasetDetails dataset={{ keywords: [] }} />)
    expect(subject.find('.keyword-label').length).toEqual(0)
  })

  test('download dataset button triggers a download', () => {
    subject = shallow(<DatasetDetails dataset={{ keywords: ['COTA', 'Transit Stops'], id: '12345' }} />)
    expect(subject.find('.keyword').filterWhere(n => { return n.text() === 'COTA' }).prop('href')).toMatch(encodeURI('/?facets[keywords][]=COTA'))
  })

})
