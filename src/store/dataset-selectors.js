import { createSelector } from "reselect";

const SOURCE_TYPE = {
  STREAMING: "stream",
  INGEST: "ingest",
  REMOTE: "remote",
  HOST: "host"
};

const dataset = state => state.datasetReducer.dataset || {}
const isDatasetLoaded = state => state.datasetReducer.dataset !== undefined
const isStreamingDataset = state => dataset(state).sourceType === SOURCE_TYPE.STREAMING
const isIngestDataset = state => dataset(state).sourceType === SOURCE_TYPE.INGEST
const isRemoteDataset = state => dataset(state).sourceType === SOURCE_TYPE.REMOTE
const isHostDataset = state => dataset(state).sourceType === SOURCE_TYPE.HOST;
const isQueryableDataset = state => isIngestDataset(state) || isStreamingDataset(state);

const isCsvDataset = createSelector(
  dataset,
  dataset => {
    return dataset.sourceFormat && dataset.sourceFormat.toLowerCase() === "csv";
  }
);

const isGeoJSONDataset = createSelector(
  dataset,
  isRemoteDataset,
  (dataset, isRemote) => dataset.sourceFormat === "geojson" && !isRemote
);

export {
  dataset as getDataset,
  isDatasetLoaded,
  isStreamingDataset,
  isIngestDataset,
  isRemoteDataset,
  isHostDataset,
  isQueryableDataset,
  isCsvDataset,
  isGeoJSONDataset
};
