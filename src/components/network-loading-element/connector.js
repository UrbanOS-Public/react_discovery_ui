import { connect } from 'react-redux'
import NetworkLoadingElement from './network-loading-element'
import { getDataSetError } from '../../store/selectors'

const mapStateToProps = state => ({
  hasNetworkError: getDataSetError(state),
  isLoading: state.presentation.isLoading
})

export default connect(mapStateToProps)(NetworkLoadingElement)
