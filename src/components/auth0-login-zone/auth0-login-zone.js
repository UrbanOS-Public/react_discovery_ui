import PropTypes from 'prop-types'
import '../login-zone/login-zone.scss'
import LoginSvgsAndText from '../login-zone/login-svgs-and-text'
import routes from '../../routes'
import withAuth0 from '../../auth/auth0-wrapper'
import LoadingElement from '../generic-elements/loading-element'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FolderIcon from '../generic-elements/folder-icon'
import ExitIcon from '@material-ui/icons/ExitToApp'
import Backup from '@material-ui/icons/Backup'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import { isMobile } from 'react-device-detect'

const returnTo = `${window.location.origin}${routes.oauth}`

export const Auth0LoginZone = ({ auth: { isAuthenticated, isLoading, loginWithRedirect, logout } }) => {
  const [isMenuToggled, setMenuToggled] = useState(false)
  const [isMouseInMenu, setMouseInMenu] = useState(false)
  const wrapperRef = useRef(null)

  const mouseEnterMenu = () => { if (!isMobile) { setMouseInMenu(true) } }
  const mouseExitMenu = () => { if (!isMobile) { setMouseInMenu(false) } }

  const toggleMenu = () => { if (isMobile) { setMenuToggled(!isMenuToggled) } }
  const clickOutMenu = () => { if (isMobile) { setMenuToggled(false) } }
  const isMenuExpanded = (isMenuToggled || isMouseInMenu)

  const regenerateApiKeyFF = window.REGENERATE_API_KEY_FF

  useClickOutWatcher(wrapperRef, clickOutMenu)

  if (isLoading) {
    return <login-zone><LoadingElement /></login-zone>
  }

  return (
    <login-zone>
      <div ref={wrapperRef}>
        <div className='login-block'>
          {
            isAuthenticated
              ? <button className={isMenuExpanded ? 'action' : 'status'} onClick={toggleMenu} onMouseEnter={mouseEnterMenu} onMouseLeave={mouseExitMenu}>
                <LoginSvgsAndText text='My Account' symbol={isMenuExpanded ? '▴' : '▾'} />
              </button>
              : <button className='action clickable' data-testid='login-button' onClick={loginWithRedirect}>
                <LoginSvgsAndText text='Log in to your account' symbol='▸' />
              </button>
          }
        </div>
        {
          (isAuthenticated && isMenuExpanded) &&
          <div className='user-menu' onMouseEnter={mouseEnterMenu} onMouseLeave={mouseExitMenu}>
            <ul>
              <li className='menu-item'>
                <FolderIcon />
                <span className='menu-text'><Link to='/user' rel='noopener noreferrer'>Workspaces</Link></span>
              </li>
              {(regenerateApiKeyFF === 'true') &&
              <li className='menu-item'>
                <VpnKeyIcon />
                <span className='menu-text'><Link to='/apiKey' rel='noopener noreferrer'>API Key</Link></span>
              </li>}
              {
                (window.CONTRIBUTE_HOST) &&
                <li className='menu-item'>
                  <Backup />
                  <span className='menu-text'><a href={window.CONTRIBUTE_HOST}>My Datasets</a></span>
                </li>
              }
              <li className='menu-item' id='logout-button' onClick={() => { logout({ returnTo }) }}>
                <ExitIcon />
                <span className='menu-text'>Log Out</span>
              </li>
            </ul>
          </div>
        }
      </div>
    </login-zone>
  )
}

function useClickOutWatcher(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

Auth0LoginZone.propTypes = {
  auth: PropTypes.shape({
    loginWithRedirect: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  }).isRequired
}

export default withAuth0(Auth0LoginZone)
