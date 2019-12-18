import { connect } from "react-redux";
import DatasetListView from "./dataset-list-view";
import { datasetSearch } from "../../store/actions";
import withSearchParamsManager from "../../search-params/search-params-manager"

import {
  getSearchResults,
  getSearchMetadata,
  isSearchLoading,
  getDataSetError,
  getNumberOfPages,
  getDataSetErrorMessage
} from "../../store/selectors";

const mapStateToProps = state => {
  return {
    searchResults: getSearchResults(state),
    searchMetadata: getSearchMetadata(state),
    numberOfPages: getNumberOfPages(state),
    isSearchLoading: isSearchLoading(state),
    isError: getDataSetError(state),
    errorMessage: getDataSetErrorMessage(state)
  };
};

export default connect(mapStateToProps)(withSearchParamsManager(DatasetListView));
