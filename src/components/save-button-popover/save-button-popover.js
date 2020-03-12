import { useState } from 'react'
import AutoAnchoringPopover from '../../components/generic-elements/auto-anchoring-popover'
import TabButton from '../../components/generic-elements/tab-button'
import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import SaveIndicator from '../../components/generic-elements/save-indicator'
import Auth0LoginZone from '../auth0-login-zone'

import './save-button-popover.scss'

const SaveButtonPopover = (props) => {
  const {
    isSaveable,
    title,
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
  const closeDialog = () => { setDialogOpen(false); }

  const saveButtonDisabled = !isAuthenticated || title == undefined || title.length == 0

  return (
    <save-button-popover>
      <TabButton data-testid="save-icon" disabled={!isSaveable} className={`header-item save-icon ${isDialogOpen && 'saving'}`} onClick={openDialog} >
        <div title='Save Workspace'><SaveIcon /></div>
      </TabButton>
      <AutoAnchoringPopover className='save-prompt popover-anchor' open={isDialogOpen} onClose={closeDialog} classes={{ paper: 'popover', root: 'popover-root' }} >
        <div>
          <b>Workspace Title: </b>
          <input className="title-input" type="text" value={title || ''} onChange={handleTitleChange}></input>
          <br />
          <button data-testid="save-button" className="save-button" onClick={handleSaveOrUpdate} disabled={saveButtonDisabled}>Save</button>
          <button data-testid="cancel-button" onClick={closeDialog}>Cancel</button>
          <SaveIndicator saving={isSaving} success={isSaveSuccess} failure={isSaveFailure} linkUrl={linkUrl} />

          {!isAuthenticated && <div className="login-prompt">
            <hr />
            <span>You must log in to save your workspace.</span>
            <Auth0LoginZone />
          </div>}
        </div>
      </AutoAnchoringPopover>
    </save-button-popover>
  )
}

export default SaveButtonPopover
