import { connect } from 'react-redux'
import DatasetQuery from './dataset-query'
import { FREESTYLE_QUERY_DATASET } from '../../store/actions'

const mapStateToProps = state => {
  return {
    queryFailureMessage: state.presentation.queryFailureMessage
  }
}

const mapDispatchToProps = dispatch => ({
  queryDataset: (queryText) => dispatch({ type: FREESTYLE_QUERY_DATASET, value: { queryText } })
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetQuery)
