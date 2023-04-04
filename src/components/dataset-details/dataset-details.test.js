import { shallow } from 'enzyme'
import DatasetDetails from './dataset-details'

describe('dataset details', () => {
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

  test('keywords link to filtered search', () => {
    subject = shallow(<DatasetDetails dataset={{ keywords: ['COTA', 'Transit Stops'], id: '12345' }} />)
    expect(subject.find('.keyword').filterWhere(n => { return n.text() === 'COTA' }).prop('href')).toMatch(encodeURI('/?facets[keywords][]=COTA'))
  })

  test('button to download api docs', () => {
    subject = shallow(<DatasetDetails dataset={{ keywords: [] }} />)
    expect(subject.find('.print-api-docs-button').length).toEqual(1)
  })
})
