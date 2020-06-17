import PropTypes from 'prop-types'
import '../login-zone/login-zone.scss'
import LoginSvgsAndText from "../login-zone/login-svgs-and-text"
import routes from '../../routes'
import withAuth0 from '../../auth/auth0-wrapper'
import LoadingElement from '../generic-elements/loading-element'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FolderIcon from '../generic-elements/folder-icon'
import ExitIcon from '@material-ui/icons/ExitToApp';

const returnTo = `${window.location.origin}${routes.oauth}`

export const Auth0LoginZone = ({ auth: { isAuthenticated, isLoading, loginWithRedirect, logout } }) => {
  const [isMenuExpanded, setMenuExpanded] = useState(false);
  if (isLoading) {
    return <login-zone><LoadingElement /></login-zone>
  }
  isAuthenticated = true

  return (
    <login-zone>
      <div className="login-block">
        {
          isAuthenticated
            ? <button className={isMenuExpanded ? "action" : "status"} onClick={() => { setMenuExpanded(!isMenuExpanded) }}><LoginSvgsAndText text="My Account" symbol={isMenuExpanded ? "▲" : "▼"} /></button>
            : <button className="action" data-testid="login-button" onClick={loginWithRedirect}><LoginSvgsAndText text="Log in to your account" symbol={"▶"} /></button>
        }
      </div>
      {
        (isAuthenticated && isMenuExpanded) &&
        <div className="user-menu">
          <ul>
            <li>
              <FolderIcon />
              <span className="menu-text"><Link to="/user">Workspaces</Link></span>
            </li>
            <li onClick={() => { logout({ returnTo }) }}>
              <ExitIcon />
              <span className="menu-text">Log Out</span>
            </li>
          </ul>
        </div>
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
