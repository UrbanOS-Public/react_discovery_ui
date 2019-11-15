import { connect } from "react-redux";
import DatasetListView from "./dataset-list-view";
import { datasetSearch } from "../../store/actions";
import withQueryParamsManager from "../../query-params/query-params-manager"

import {
  getSearchResults,
  getSearchMetadata,
  isSearchLoading,
  getDataSetError,
  getNumberOfPages
} from "../../store/selectors";

const mapStateToProps = ( state, ownProps ) => {
  return {
    searchResults: getSearchResults(state),
    searchMetadata: getSearchMetadata(state),
    numberOfPages: getNumberOfPages(state),

    isSearchLoading: isSearchLoading(state),
    error: getDataSetError(state)
  };
};

export default connect(mapStateToProps)(withQueryParamsManager(DatasetListView));
