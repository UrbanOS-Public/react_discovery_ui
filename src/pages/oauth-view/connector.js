import { connect } from 'react-redux'
import OAuthView from './oauth-view'
import { oAuthCallLoggedIn } from '../../store/actions'

const mapDispatchToProps = dispatch => ({
  callLoggedIn: () => dispatch(oAuthCallLoggedIn())
})

export default connect(null, mapDispatchToProps)(OAuthView)
