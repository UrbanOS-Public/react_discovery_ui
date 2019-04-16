import { connect } from 'react-redux'
import LoginZone from './login-zone'
import { lastLogoutAttemptFailed } from '../../store/selectors'
import { logout } from '../../store/actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  lastAttemptFailed: lastLogoutAttemptFailed(state)
})

const mapDispatchToProps = dispatch => ({
  logout: (credentials) => dispatch(logout(credentials))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginZone))
