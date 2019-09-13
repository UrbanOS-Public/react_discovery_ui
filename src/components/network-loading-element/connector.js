import { connect } from 'react-redux'
import NetworkLoadingElement from './network-loading-element'
import { getDataSetError, determineIfLoading } from '../../store/selectors'

const mapStateToProps = state => ({
  hasNetworkError: getDataSetError(state),
  networkLoading: determineIfLoading(state)
})

export default connect(mapStateToProps)(NetworkLoadingElement)
