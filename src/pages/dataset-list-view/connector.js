import { connect } from 'react-redux'
import DatasetListView from './dataset-list-view'
import { setGlobalErrorState } from '../../store/actions'
import withSearchParamsManager from '../../search-params/search-params-manager'

import {
  getSearchResults,
  getSearchMetadata,
  isSearchLoading,
  getNumberOfPages,
  getGlobalErrorState,
  getGlobalErrorMessage
} from '../../store/selectors'

const mapStateToProps = state => {
  return {
    searchResults: getSearchResults(state),
    searchMetadata: getSearchMetadata(state),
    numberOfPages: getNumberOfPages(state),
    isSearchLoading: isSearchLoading(state),
    isGlobalError: getGlobalErrorState(state),
    globalErrorMessage: getGlobalErrorMessage(state)
  }
}

const mapDispatchToProps = dispatch => ({
  dismissGlobalError: () => dispatch(setGlobalErrorState(false, ''))
})

export default connect(mapStateToProps, mapDispatchToProps)(withSearchParamsManager(DatasetListView))
