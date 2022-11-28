import { connect } from 'react-redux'
import ApiKeyView from './apikey-view'
import { lastLoginAttemptFailed } from '../../store/selectors'
import { login } from '../../store/actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  lastAttemptFailed: lastLoginAttemptFailed(state) // TODO: remove/change?
})

const mapDispatchToProps = dispatch => ({
  login: (credentials) => dispatch(login(credentials)) // TODO: remove/change?
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApiKeyView))
