import '../login-zone/login-zone.scss'

import LoginSvgsAndText from "../login-zone/login-svgs-and-text"
import routes from '../../routes';

const returnTo = `${window.location.origin}${routes.oauth}`

const OAuthLoginZone = ({ isAuthenticated, loginWithRedirect, logout }) => {
  return (
    <login-zone>
      {
        isAuthenticated
          ? <button onClick={() => { logout({ returnTo }) }}><LoginSvgsAndText text="LOG OUT" /></button>
          : <button onClick={loginWithRedirect}><LoginSvgsAndText text="LOG IN" /></button>
      }
    </login-zone>
  )
}

export default OAuthLoginZone
