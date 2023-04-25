import { useState } from 'react'
import FolderIcon from '../generic-elements/folder-icon'
import TabButton from '../generic-elements/tab-button'
import AutoAnchoringPopover from '../generic-elements/auto-anchoring-popover'
import { Link } from 'react-router-dom'
import Auth0LoginZone from '../auth0-login-zone'

import './visualization-list-menu-item.scss'

const VisualizationListMenuItem = ({ isAuthenticated }) => {
  const [userNeedsLoginInfo, setUserNeedsLoginInfo] = useState(false)
  const showLoginPrompt = () => { setUserNeedsLoginInfo(true) }
  const closeLoginPrompt = () => { setUserNeedsLoginInfo(false) }

  return (
    <visualization-list-menu-item>
      <TabButton data-testid='visualization-list-menu-item' className={`button-${isAuthenticated ? 'enabled' : 'disabled'} ${userNeedsLoginInfo && 'dialog-open'}`} onClick={showLoginPrompt}>
        <div className='visualization-list-menu-item-icon-holder' title='Saved Workspaces'>
          <FolderIcon className={`header-item link-${isAuthenticated ? 'enabled' : 'disabled'}`} accessibilityDesc="Open Saved Workspaces" />
        </div>
      </TabButton>
      <AutoAnchoringPopover className='login-prompt popover-anchor' open={!isAuthenticated && userNeedsLoginInfo} onClose={closeLoginPrompt} classes={{ paper: 'popover', root: 'popover-root' }}>
        <div>
          <span>You must log in to see your saved workspaces.</span>
          <Auth0LoginZone />
        </div>
      </AutoAnchoringPopover>
    </visualization-list-menu-item>
  )
}

export default VisualizationListMenuItem
