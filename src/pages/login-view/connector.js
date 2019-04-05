import { connect } from 'react-redux'
import LoginView from './login-view'
import { lastLoginAttemptFailed } from '../../store/selectors'
import { login } from '../../store/actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  lastAttemptFailed: lastLoginAttemptFailed(state)
})

const mapDispatchToProps = dispatch => ({
  login: (credentials) => dispatch(login(credentials))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView))
