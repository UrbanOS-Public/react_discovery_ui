import DatasetListView from './dataset-list-view'
import { retrieveDataList } from '../../store/actions'
import { getDataSetList, getDataSetError } from '../../store/selectors'

import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    datasets: getDataSetList(state),
    displayNetworkError: getDataSetError(state)
  }
}

const mapDispatchToProps = dispatch => ({
  retrieveDataset: () => dispatch(retrieveDataList())
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListView)
