import { connect } from 'react-redux'
import DatasetListView from './dataset-list-view'
import { datasetSearch, updateDatasetSearchParams } from '../../store/actions'
import { getSearchParams, getSearchResults, getSearchMetadata, getPageNumber } from '../../store/selectors'


const mapStateToProps = state => {
  return {
    searchParams: getSearchParams(state),
    searchResults: getSearchResults(state),
    searchMetadata: getSearchMetadata(state),
    pageNumber: getPageNumber(state)
 }
}

const mapDispatchToProps = dispatch => ({
  datasetSearch: () => dispatch(datasetSearch()),
  updateDatasetSearchParams: params => dispatch(updateDatasetSearchParams(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListView)
