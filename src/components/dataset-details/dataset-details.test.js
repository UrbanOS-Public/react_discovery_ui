import { shallow } from 'enzyme'
import DatasetDetails from './dataset-details'

import VisualizeButton from '../../components/generic-elements/visualize-button'

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
const hostedDataset = Object.assign({}, ingestDataset, { sourceType: 'host' })
const remoteDataset = Object.assign({}, ingestDataset, { sourceType: 'remote' })
const streamingDataset = Object.assign({}, ingestDataset, { sourceType: 'stream' })

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

  describe('VisualizeButton', () => {
    const makeComponent = dataset => shallow(<DatasetDetails dataset={dataset} />)

    it('shows for ingest datasets', () => {
      subject = makeComponent(ingestDataset)
      expect(subject.find(VisualizeButton)).toHaveLength(1)
    })

    it('shows for streaming datasets', () => {
      subject = makeComponent(streamingDataset)
      expect(subject.find(VisualizeButton)).toHaveLength(1)
    })

    it('does not show for remote datasets', () => {
      subject = makeComponent(remoteDataset)
      expect(subject.find(VisualizeButton)).toHaveLength(0)
    })

    it('does not show for hosted datasets', () => {
      subject = makeComponent(hostedDataset)
      expect(subject.find(VisualizeButton)).toHaveLength(0)
    })
  })

})
