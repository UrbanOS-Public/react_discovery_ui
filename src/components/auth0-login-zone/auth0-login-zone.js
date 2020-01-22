import PropTypes from 'prop-types'
import '../login-zone/login-zone.scss'
import LoginSvgsAndText from "../login-zone/login-svgs-and-text"
import routes from '../../routes'
import withAuth0 from '../../auth/auth0-wrapper'
import LoadingElement from '../generic-elements/loading-element'

const returnTo = `${window.location.origin}${routes.oauth}`

export const Auth0LoginZone = ({ auth: { isAuthenticated, isLoading, loginWithRedirect, logout}  }) => {
  if (isLoading) {
    return <login-zone><LoadingElement /></login-zone>
  }

  return (
    <login-zone>
      {
        isAuthenticated
          ? <button onClick={() => { logout({ returnTo }) }}><LoginSvgsAndText text="LOG OUT" /></button>
          : <button data-testid="login-button" onClick={ loginWithRedirect }><LoginSvgsAndText text="LOG IN" /></button>
      }
    </login-zone>
  )
}

Auth0LoginZone.propTypes = {
  auth: PropTypes.shape({
    loginWithRedirect: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  }).isRequired,
}

export default withAuth0(Auth0LoginZone)
