import { getDataset, isStreamingDataset, isIngestDataset, isRemoteDataset, isHostDataset, isCsvDataset, isGeoJSONDataset, isDatasetLoaded, downloadUrl } from "./dataset-selectors"

describe('datasetSelectors', () => {
  const createState = datasetOpts => {
    return {
      datasetReducer: {
        dataset: {
          ...datasetOpts
        }
      }
    }
  }

  describe('getDataset', () => {
    it('returns the dataset', () => {
      const expected = { something: '__FAKE_DATASET__' }
      const state = createState(expected)

      const result = getDataset(state)
      expect(result).toEqual(expected)
    })

    it('returns {} if dataset is undefined', () => {
      const state = { datasetReducer: {} }

      const result = getDataset(state)
      expect(result).toEqual({})
    })
  })

  describe('isDatasetLoaded', () => {
    it('returns the false if dataset is undefined', () => {
      const state = { datasetReducer: {} }

      const result = isDatasetLoaded(state)
      expect(result).toBe(false)
    })

    it('returns the true if dataset is defined', () => {
      const state = createState()

      const result = isDatasetLoaded(state)
      expect(result).toBe(true)
    })
  })

  describe('isStreamingDataset', () => {
    it('isStreamingDataset returns true when sourceType is stream', () => {
      const state = createState({
        sourceType: 'stream'
      })

      const result = isStreamingDataset(state)
      expect(result).toBe(true)
    })
  })

  describe('isIngestDataset', () => {
    it('returns true when sourceType is ingest', () => {
      const state = createState({
        sourceType: 'ingest'
      })

      const result = isIngestDataset(state)
      expect(result).toBe(true)
    })
  })

  describe('isRemoteDataset', () => {
    it('returns true when sourceType is remote', () => {
      const state = createState({
        sourceType: 'remote'
      })

      const result = isRemoteDataset(state)
      expect(result).toBe(true)
    })
  })

  describe('isHostDataset', () => {
    it('returns true when sourceType is host', () => {
      const state = createState({
        sourceType: 'host'
      })

      const result = isHostDataset(state)
      expect(result).toBe(true)
    })
  })

  describe('isCsvDataset', () => {
    it('returns true when fileTypes contains csv (case insensitive)', () => {
      const state = createState({
        fileTypes: ['json', 'CsV']
      })

      expect(isCsvDataset(state)).toBe(true)
    })

    it('returns false when fileTypes does not exist', () => {
      const state = createState({})

      expect(isCsvDataset(state)).toBeFalsy()
    })
  })

  describe('isGeoJSONDataset', () => {
    it('returns true when fileTypes contains geojson (case insensitive)', () => {
      const state = createState({
        fileTypes: ['json', 'geoJson']
      })

      expect(isGeoJSONDataset(state)).toBe(true)
    })

    it('returns false when fileTypes does not contain geojson', () => {
      const state = createState({
        fileTypes: ['json']
      })

      expect(isGeoJSONDataset(state)).toBeFalsy()
    })

    it('returns false when dataset is remote', () => {
      const state = createState({
        fileTypes: ['geojson'],
        sourceType: 'remote'
      })

      expect(isGeoJSONDataset(state)).toBeFalsy()
    })
  })

  describe('datasetUrl', () => {
    it('returns the source url for remote datasets', () => {
      const state = createState({
        sourceType: 'remote',
        sourceUrl: 'http://stuff.stuff'
      })

      expect(downloadUrl(state)).toBe('http://stuff.stuff')
    })

    it('returns a download url with the first file type downcased as the format for a non-remote dataset', () => {
      const state = createState({
        id: 'dataset_id',
        sourceType: 'ingest',
        fileTypes: ['A-Positive', 'ONEGATIVE']
      })

      expect(downloadUrl(state)).toBe(`${window.API_HOST}/api/v1/dataset/dataset_id/download?_format=a-positive`)
    })

    it('returns a download url with json as the format instead of gtfs', () => {
      const state = createState({
        id: 'dataset_id',
        fileTypes: ['gtfs']
      })

      expect(downloadUrl(state)).toBe(`${window.API_HOST}/api/v1/dataset/dataset_id/download?_format=json`)
    })

    it('returns a download url with json when no file types are present', () => {
      const state = createState({
        id: 'dataset_id',
        fileTypes: []
      })

      expect(downloadUrl(state)).toBe(`${window.API_HOST}/api/v1/dataset/dataset_id/download?_format=json`)
    })
  })
})
