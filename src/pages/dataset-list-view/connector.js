import DatasetListView from './dataset-list-view'
import { retrieveDataList } from '../../store/actions'
import { getDataSetList, getDataSetError, getTotalNumberOfDatasets, determineIfLoading } from '../../store/selectors'

import { connect } from 'react-redux'

const mapStateToProps = state => ({
  datasets: getDataSetList(state),
  displayNetworkError: getDataSetError(state),
  totalDatasets: getTotalNumberOfDatasets(state),
  loading: determineIfLoading(state)
})

const mapDispatchToProps = dispatch => ({
  retrieveDataset: (input) => dispatch(createRetrieveAction(input))
})

const createRetrieveAction = ({ page, pageSize, sort, query }) => {
  const offset = (page - 1) * pageSize
  return retrieveDataList(offset, pageSize, sort, query)
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListView)
