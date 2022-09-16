import { useState } from 'react'
import AutoAnchoringPopover from '../../components/generic-elements/auto-anchoring-popover'
import TabButton from '../../components/generic-elements/tab-button'
import SaveIcon from '@material-ui/icons/Save'
import SaveIndicator from '../../components/generic-elements/save-indicator'
import Auth0LoginZone from '../auth0-login-zone'
import { intersection, isEmpty } from 'lodash'

import './visualization-save-menu-item.scss'

const buttonActions = {
  saveButton: ['create', 'update'],
  saveCopyButton: ['create_copy']
}

const VisualizationSaveMenuItem = (props) => {
  const {
    isSaveable,
    title,
    allowedActions,
    handleTitleChange,
    handleSaveOrUpdate,
    isSaving,
    isSaveSuccess,
    isSaveFailure,
    linkUrl,
    isAuthenticated
  } = props

  const [isDialogOpen, setDialogOpen] = useState(false)
  const openDialog = () => { setDialogOpen(true) }
  const closeDialog = () => { setDialogOpen(false) }

  const buttonDisabled = buttonKey => {
    const actionNotAllowed = intersection(buttonActions[buttonKey], allowedActions).length == 0
    return !isAuthenticated || isEmpty(title) || actionNotAllowed
  }

  return (
    <visualization-save-menu-item>
      <TabButton data-testid='save-icon' disabled={!isSaveable} className={`header-item save-icon ${isDialogOpen && 'saving'}`} onClick={openDialog}>
        <div title='Save Workspace'><SaveIcon /></div>
      </TabButton>
      <AutoAnchoringPopover className='save-prompt popover-anchor' open={isDialogOpen} onClose={closeDialog} classes={{ paper: 'popover', root: 'popover-root' }}>
        <div>
          <b>Workspace Title: </b>
          <input className='title-input' type='text' value={title || ''} onChange={handleTitleChange} />
          <br />
          <div className='button-container'>
            <div>
              <button data-testid='save-button' className='save-button' onClick={() => { handleSaveOrUpdate({}) }} disabled={buttonDisabled('saveButton')}>Save</button>
              <button data-testid='save-copy-button' className='save-copy-button' onClick={() => { handleSaveOrUpdate({ shouldCreateCopy: true }) }} disabled={buttonDisabled('saveCopyButton')}>Save a Copy</button>
            </div>
            <div>
              <button data-testid='cancel-button' onClick={closeDialog}>Cancel</button>
            </div>
          </div>
          <SaveIndicator saving={isSaving} success={isSaveSuccess} failure={isSaveFailure} linkUrl={linkUrl} />

          {!isAuthenticated && <div className='login-prompt'>
            <hr />
            <span>You must log in to save your workspace.</span>
            <Auth0LoginZone />
          </div>}
        </div>
      </AutoAnchoringPopover>
    </visualization-save-menu-item>
  )
}

export default VisualizationSaveMenuItem
