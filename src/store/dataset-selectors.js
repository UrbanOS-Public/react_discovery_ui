import { createSelector } from 'reselect'
import { containsFileType } from '../utils/file-type-utils'

const SOURCE_TYPE = {
  STREAMING: 'stream',
  INGEST: 'ingest',
  REMOTE: 'remote',
  HOST: 'host'
}

const dataset = state => state.datasetReducer.dataset || {}
const isDatasetLoaded = state => state.datasetReducer.dataset !== undefined
const isStreamingDataset = state => dataset(state).sourceType === SOURCE_TYPE.STREAMING
const isIngestDataset = state => dataset(state).sourceType === SOURCE_TYPE.INGEST
const isRemoteDataset = state => dataset(state).sourceType === SOURCE_TYPE.REMOTE
const isHostDataset = state => dataset(state).sourceType === SOURCE_TYPE.HOST
const isQueryableDataset = state => isIngestDataset(state) || isStreamingDataset(state)

const isCsvDataset = createSelector(dataset, dataset => containsFileType(dataset, 'csv'))

const isGeoJSONDataset = createSelector(
  dataset,
  isRemoteDataset,
  (dataset, isRemote) => containsFileType(dataset, 'geojson') && !isRemote
)

const downloadUrl = createSelector(dataset, isRemoteDataset,
  (dataset, isRemote) => {
    if (isRemote) { return dataset.sourceUrl }

    return `${window.DISC_API_URL}/api/v1/dataset/${dataset.id}/download/presigned_url`
  }
)

export {
  dataset as getDataset,
  isDatasetLoaded,
  isStreamingDataset,
  isIngestDataset,
  isRemoteDataset,
  isHostDataset,
  isQueryableDataset,
  isCsvDataset,
  isGeoJSONDataset,
  downloadUrl
}
