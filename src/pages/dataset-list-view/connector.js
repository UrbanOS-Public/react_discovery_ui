import DatasetListView from './dataset-list-view'
import { retrieveDataList } from '../../store/actions'
import { getDataSetList, getDataSetError, getTotalNumberOfDatasets } from '../../store/selectors'

import { connect } from 'react-redux'

const mapStateToProps = state => ({
  datasets: getDataSetList(state),
  displayNetworkError: getDataSetError(state),
  totalDatasets: getTotalNumberOfDatasets(state)
})

const mapDispatchToProps = dispatch => ({
  retrieveDataset: ({ page, pageSize, sort }) => dispatch(createRetrieveAction(page, pageSize, sort))
})

const createRetrieveAction = (page, pageSize, sort) => {
  const offset = (page - 1) * pageSize
  return retrieveDataList(offset, pageSize, sort)
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListView)
