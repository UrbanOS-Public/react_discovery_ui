import {getDefaultFormat} from './file-type-utils'
describe('datasetUrl', () => {
    it('returns the first file type downcased', () => {
        const dataset = {
        id: 'dataset_id',
        sourceType: 'ingest',
        fileTypes: ['A-Positive', 'ONEGATIVE']
        }

    expect(getDefaultFormat(dataset)).toBe('a-positive')
  })

  it('returns json as the format instead of gtfs', () => {
    const dataset = {
      id: 'dataset_id',
      fileTypes: ['gtfs']
    }

    expect(getDefaultFormat(dataset)).toBe('json')
  })

  it('returns json when no file types are present', () => {
    const dataset = {
      id: 'dataset_id',
      fileTypes: []
    }
    expect(getDefaultFormat(dataset)).toBe('json')
    })
})