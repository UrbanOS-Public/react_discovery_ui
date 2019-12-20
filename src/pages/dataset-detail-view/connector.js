import { connect } from "react-redux";
import DatasetDetailView from "./dataset-detail-view";
import {
  retrieveDatasetDetails,
  clearDatasetDetails,
  clearDatasetPreview
} from "../../store/actions";
import { getDataSet } from "../../store/selectors";
import { downloadUrl } from "../../store/dataset-selectors";
import {
  isStreamingDataset,
  isIngestDataset,
  isRemoteDataset,
  isCsvDataset,
  isGeoJSONDataset,
  isHostDataset
} from "../../store/dataset-selectors";

const mapStateToProps = state => {
  return {
    dataset: getDataSet(state),
    isStreaming: isStreamingDataset(state),
    isIngest: isIngestDataset(state),
    isRemote: isRemoteDataset(state),
    isHost: isHostDataset(state),
    isCsv: isCsvDataset(state),
    isGeoJSON: isGeoJSONDataset(state),
    downloadUrl: downloadUrl(state)
  };
};

const mapDispatchToProps = dispatch => ({
  retrieveDatasetDetails: (org_name, dataset_name) =>
    dispatch(retrieveDatasetDetails(org_name, dataset_name)),
  clearDatasetDetails: () => dispatch(clearDatasetDetails()),
  clearDatasetPreview: () => dispatch(clearDatasetPreview())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDetailView);
