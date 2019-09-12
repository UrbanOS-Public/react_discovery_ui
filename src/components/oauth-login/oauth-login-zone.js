import '../login-zone/login-zone.scss'

import LoginSvgsAndText from "../login-zone/login-svgs-and-text"
import { useAuth0 } from "../../auth/react-auth0-wrapper"

const OauthLoginZone = () => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()
  return (
    <login-zone>
      {
        isAuthenticated
          ? <button onClick={logout}><LoginSvgsAndText text="LOG OUT" /></button>
          : <button onClick={loginWithRedirect}><LoginSvgsAndText text="LOG IN" /></button>
      }
    </login-zone>
  )
}

export default OauthLoginZone
