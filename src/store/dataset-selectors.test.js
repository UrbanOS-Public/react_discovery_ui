import { getDataset, isStreamingDataset, isIngestDataset, isRemoteDataset, isHostDataset, isCsvDataset, isGeoJSONDataset } from "./dataset-selectors"

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
    
    it('getDataset returns the dataset', () => {
        const expected = {something: '__FAKE_DATASET__'}
        const state = createState(expected)

        const result = getDataset(state)
        expect(result).toEqual(expected)
    })

    it('isStreamingDataset returns true when sourceType is stream', () => {
        const state = createState({
            sourceType: 'stream'
        })

        const result = isStreamingDataset(state)
        expect(result).toBe(true)
    })

    it('isIngestDataset returns true when sourceType is ingest', () => {
        const state = createState({
            sourceType: 'ingest'
        })

        const result = isIngestDataset(state)
        expect(result).toBe(true)
    })

    it('isRemoteDataset returns true when sourceType is remote', () => {
        const state = createState({
            sourceType: 'remote'
        })

        const result = isRemoteDataset(state)
        expect(result).toBe(true)
    })

    it('isHostDataset returns true when sourceType is host', () => {
        const state = createState({
            sourceType: 'host'
        })

        const result = isHostDataset(state)
        expect(result).toBe(true)
    })

    it('isCsvDataset returns true when sourceFormat is csv (case insensitive)', () => {
        const state = createState({
            sourceFormat: 'CSV'
        })

        const result = isCsvDataset(state)
        expect(result).toBe(true)
    })

    it('isGeoJSONDataset returns true when sourceFormat is geojson (case sensitive)', () => {
        const state = createState({
            sourceFormat: 'geojson'
        })

        const result = isGeoJSONDataset(state)
        expect(result).toBe(true)
    })
})