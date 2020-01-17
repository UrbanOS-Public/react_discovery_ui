import { useState } from 'react'
import FolderIcon from '../generic-elements/folder-icon'
import TabButton from '../generic-elements/tab-button'
import AutoAnchoringPopover from '../generic-elements/auto-anchoring-popover'
import { Link } from 'react-router-dom'
import Auth0LoginZone from '../auth0-login-zone'

import './user-page-button-popover.scss'


const UserPageButtonPopover = ({isAuthenticated}) => {
  const [userNeedsLoginInfo, setUserNeedsLoginInfo] = useState(false)
  const showLoginPrompt = () => { setUserNeedsLoginInfo(true)}
  const closeLoginPrompt = () => { setUserNeedsLoginInfo(false)}

  return (
    <user-page-button-popover>
      <TabButton data-testid="user-page-button-popover" className={`button-${isAuthenticated ? 'enabled' : 'disabled'}`} onClick={showLoginPrompt}>
        <div title='Saved Visualizations'>
          <Link to="/user" className={`header-item link-${isAuthenticated ? 'enabled' : 'disabled'}`}>
            <FolderIcon />
          </Link>
        </div>
      </TabButton>
      <AutoAnchoringPopover className='login-prompt popover-anchor' open={!isAuthenticated && userNeedsLoginInfo} onClose={closeLoginPrompt}>
        <div className="login-message">
          <p>You need to be logged in to see your visualizations</p>
          <Auth0LoginZone />
        </div>
      </AutoAnchoringPopover>
    </user-page-button-popover>
  )
}

export default UserPageButtonPopover
