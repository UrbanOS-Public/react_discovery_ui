import { connect } from "react-redux";
import DatasetListView from "./dataset-list-view";
import { datasetSearch, updateDatasetSearchParams } from "../../store/actions";
import {
  getSearchParams,
  getSearchResults,
  getSearchMetadata,
  getPageNumber,
  isSearchLoading,
  getDataSetError,
  getNumberOfPages
} from "../../store/selectors";

const mapStateToProps = ( state, ownProps ) => {
  return {
    searchParams: getSearchParams(state),
    searchResults: getSearchResults(state),
    searchMetadata: getSearchMetadata(state),
    pageNumber: getPageNumber(state),
    numberOfPages: getNumberOfPages(state),
    isSearchLoading: isSearchLoading(state),
    error: getDataSetError(state)
  };
};

const mapDispatchToProps = dispatch => ({
  datasetSearch: () => dispatch(datasetSearch()),
  updateDatasetSearchParams: params => {
    return dispatch(updateDatasetSearchParams(params));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetListView);
