import { connect } from 'react-redux'
import ApiKeyView from './apikey-view'
import { determineIfLoading, getApiKeyState, getGlobalErrorMessage, getGlobalErrorState } from '../../store/selectors'
import { generateApiKey, setGlobalErrorState } from '../../store/actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  apiKey: getApiKeyState(state),
  isLoading: determineIfLoading(state),
  isError: getGlobalErrorState(state),
  errorMessage: getGlobalErrorMessage(state)
})

const mapDispatchToProps = dispatch => ({
  generate: () => dispatch(generateApiKey()),
  dismissGlobalError: () => dispatch(setGlobalErrorState(false, ''))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApiKeyView))
