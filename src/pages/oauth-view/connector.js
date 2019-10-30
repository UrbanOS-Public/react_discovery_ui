import { connect } from 'react-redux'
import OAuthView from './oauth-view'
import { oAuthCallLoggedIn } from '../../store/actions'


const mapStateToProps = state => {
  // return {
  //   loading: false
  // }
}

const mapDispatchToProps = dispatch => ({
  callLoggedIn: () => dispatch(oAuthCallLoggedIn())
})

export default connect(mapStateToProps, mapDispatchToProps)(OAuthView)
