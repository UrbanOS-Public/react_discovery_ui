import { useState } from 'react'
import AutoAnchoringPopover from '../../components/generic-elements/auto-anchoring-popover'
import TabButton from '../../components/generic-elements/tab-button'
import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import SaveIndicator from '../../components/generic-elements/save-indicator'

import './save-button-popover.scss'

const SaveButtonPopover = (props) => {
  const {
    isSaveable,
    localTitle,
    handleTitleChange,
    handleSaveOrUpdate,
    isSaving,
    isSaveSuccess,
    isSaveFailure,
    linkUrl
  } = props


  const [isDialogOpen, setDialogOpen] = useState(false)
  const openDialog = () => { setDialogOpen(true) }
  const closeDialog = () => { setDialogOpen(false); }

  return (
    <save-button-popover>
      <TabButton data-testid="save-icon" disabled={!isSaveable} className={`header-item save-icon ${isDialogOpen && 'saving'}`} onClick={openDialog} >
        <div title='Save Visualization'><SaveIcon /></div>
      </TabButton>
      <AutoAnchoringPopover className='save-prompt popover-anchor' open={isDialogOpen} onClose={closeDialog} classes={{ paper: 'popover', root: 'popover-root' }} >
        <div>
          <b>Query Title: </b>
          <input className="prompt" type="text" placeholder="Query Name" value={localTitle || ''} onChange={handleTitleChange}></input>
          <ClearIcon className='clear-icon' onClick={closeDialog} />
          <br />
          <button data-testid="save-button" className="save-button" onClick={handleSaveOrUpdate} disabled={localTitle == undefined || localTitle.length == 0}>Save</button>
          <button data-testid="cancel-button" onClick={closeDialog}>Cancel</button>
          <SaveIndicator saving={isSaving} success={isSaveSuccess} failure={isSaveFailure} linkUrl={linkUrl} />
        </div>
      </AutoAnchoringPopover>
    </save-button-popover>
  )
}

export default SaveButtonPopover
