import { connect } from 'react-redux'
import OAuthView from './oauth-view'
import { oAuthCallLoggedIn } from '../../store/actions'
import withAuth0 from '../../auth/auth0-wrapper'

const mapDispatchToProps = dispatch => ({
  callLoggedIn: () => dispatch(oAuthCallLoggedIn())
})

export default connect(null, mapDispatchToProps)(withAuth0(OAuthView))
