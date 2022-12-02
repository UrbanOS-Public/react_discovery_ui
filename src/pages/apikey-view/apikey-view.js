import './apikey-view.scss'
import Modal from 'react-modal'
import { useState } from 'react'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import LoadingElement from '../../components/generic-elements/loading-element'
import AlertComponent from '../../components/generic-elements/alert-component'
import routes from '../../routes'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import CloseIcon from '@material-ui/icons/Close'

const ApiKeyView = ({ apiKey, isLoading, isError, errorMessage, generate, dismissGlobalError }) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  Modal.setAppElement('*')

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const copyApiKeyToClipboard = async () => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(apiKey)
    } else {
      return document.execCommand('copy', true, apiKey)
    }
  }

  const renderModal = () => {
    return (
      <Modal
        className='apiKey-modal-container'
        isOpen={modalIsOpen}
      >
        <div className='apikey-modal-header-box'>
          <div className='apiKey-modal-title'>
            Generate API Key
          </div>
          <CloseIcon className='apiKey-modal-close-button' onClick={closeModal} />
        </div>

        <hr className='solid' />
        <div className='apikey-modal-paragraph'>
          <div className='apikey-modal-warning-icon-container'>
            <ReportProblemOutlinedIcon className='apikey-modal-warning-icon' />
          </div>
          <div className='apikey-modal-paragraph-text'>
            Please note that generating a new API key will invalidate any existing API configurations. You will need to
            update any system using your API key with the newly generated key.
          </div>
          {
            isLoading && (
              <div className='loading-spinner-container'>
                <LoadingElement className='loading-spinner' />
              </div>
            )
          }
        </div>
        <hr className='solid' />
        <div className='apikey-modal-button-group'>
          <button className='apikey-modal-confirm-button' onClick={generate}>Generate</button>
          <button className='apikey-modal-cancel-button' onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    )
  }

  const renderGeneratePage = () => {
    return (
      <div>
        {renderModal()}
        <div className='apiKey-view-title'>
          Generate API Key {apiKey}
        </div>
        <div className='apiKey-view-paragraph'>Your API key should be kept secure and never shared. For security
          reasons,
          we do not display your API key.
        </div>
        <div className='apiKey-view-paragraph'>For first time API Key creation or if you lose your API key, you can
          generate a new key here.
        </div>
        <button className='apiKey-view-generate-button primary-background-color' onClick={openModal}>Generate</button>
      </div>
    )
  }

  const renderDisplayPage = () => {
    return (
      <div>
        <div className='apiKey-view-title'>
          Your API Key
        </div>
        <div className='apiKey-view-paragraph'>This API key will only be displayed once. Please store it somewhere
          secure. If you lose it, you will need to reset your key to get a new one.
        </div>
        <div className='apiKey-view-sub-title'>
          API Key
        </div>
        <div className='apiKey-view-display-page-display-window-container'>
          <input className='apiKey-view-display-page-display-window' type='text' value={apiKey} readOnly />
          <button className='apiKey-view-display-page-copy-button primary-background-color' onClick={copyApiKeyToClipboard}>
            Copy
            <FileCopyIcon />
          </button>
        </div>
        <div className='apiKey-view-display-page-return-button-container'>
          <a className='apiKey-view-display-page-return-button-link' href={routes.root}>
            <button className='apiKey-view-display-page-return-button primary-background-color'> Return Home</button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className='apiKey-view-container'>
      <AlertComponent errorMessage={errorMessage} closeFunction={dismissGlobalError} showAlert={isError} />
      {
        !apiKey && renderGeneratePage()
      }
      {
        apiKey && renderDisplayPage()
      }
    </div>
  )
}
export default ApiKeyView
