import { createSelector } from "reselect";

const SOURCE_TYPE = {
  STREAMING: "stream",
  INGEST: "ingest",
  REMOTE: "remote",
  HOST: "host"
};

const FORMAT_OVERRIDES = {
  gtfs: 'json'
}

const dataset = state => state.datasetReducer.dataset || {}
const isDatasetLoaded = state => state.datasetReducer.dataset !== undefined
const isStreamingDataset = state => dataset(state).sourceType === SOURCE_TYPE.STREAMING
const isIngestDataset = state => dataset(state).sourceType === SOURCE_TYPE.INGEST
const isRemoteDataset = state => dataset(state).sourceType === SOURCE_TYPE.REMOTE
const isHostDataset = state => dataset(state).sourceType === SOURCE_TYPE.HOST;
const isQueryableDataset = state => isIngestDataset(state) || isStreamingDataset(state);

const containsFileType = (dataset, fileType) => dataset.fileTypes && dataset.fileTypes.map(type => type.toLowerCase()).includes(fileType)

const isCsvDataset = createSelector(dataset, dataset => containsFileType(dataset, 'csv'))

const isGeoJSONDataset = createSelector(
  dataset,
  isRemoteDataset,
  (dataset, isRemote) => containsFileType(dataset, 'geojson') && !isRemote
)

const downloadUrl = createSelector(dataset, isRemoteDataset,
  (dataset, isRemote) => {
    if (isRemote) { return dataset.sourceUrl }

    let format = dataset.fileTypes && dataset.fileTypes.length > 0
      ? dataset.fileTypes[0].toLowerCase()
      : 'json'
    format = FORMAT_OVERRIDES[format] || format
    return `${window.API_HOST}/api/v1/dataset/${dataset.id}/download?_format=${format}`
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
};
