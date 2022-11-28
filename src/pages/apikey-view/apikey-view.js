import './apikey-view.scss'
import Modal from 'react-modal'
import { useState } from 'react'

const ApiKeyView = props => {
  const [modalIsOpen, setIsOpen] = useState(false)

  Modal.setAppElement('*')

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className='apiKey-view-container'>
      <Modal
        className='apiKey-modal-container'
        isOpen={modalIsOpen}
        // style={customStyles}
        // contentLabel='Call To Action Modal'
      >
        <div>
          Reset API Key
        </div>
        <div>
          Please note that resetting your API key will invalidate your current API configurations. You will need to update any system using your API key with the newly generated key.
        </div>
        <div className='modal-button-group'>
          <button className='modal-cancel modal-button' onClick={closeModal}>Cancel</button>
          <button className='modal-confirm modal-button' onClick={() => {}}>Continue</button>
        </div>
      </Modal>
      <div className='apiKey-view-title'>
        Generate API Key
      </div>
      <div className='apiKey-view-paragraph'>Your API key should be kept secure and never shared. For security reasons,
        we do not display your API key.
      </div>
      <div className='apiKey-view-paragraph'>For first time API Key creation or if you lose your API key, you can
        generate a new key here.
      </div>
      <button className='apiKey-view-generate-button' onClick={openModal}>Generate</button>
    </div>
  )
}
export default ApiKeyView
