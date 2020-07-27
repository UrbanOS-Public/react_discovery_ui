
import "./call-to-action-button.scss";
import { useState } from 'react'
import Modal from 'react-modal';
import { AuthenticatedHTTPClient } from "../../../utils/http-clients";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export function CallToActionButton({ url, format, sourceType, sourceUrl }) {
  const [modalIsOpen,setIsOpen] = useState(false);
  const isRemote = (sourceType && sourceType == "remote")

  Modal.setAppElement('*')

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleAction = async () => {
    if (isRemote) {
      openModal()
    } 
    else {
      const result = await AuthenticatedHTTPClient.get(url);
      const downloadUrl = result.data + "&_format=" + format;
      window.location.href = downloadUrl;
    }
  };

  const callToActionText = () => {
    if (isRemote) {
      return "Open Dataset"
    } else {
      return "Download"
    }
  }

  const navigateToSourceUrl = () => {
    window.open(sourceUrl)
    closeModal()
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Call To Action Modal"
      >
        <p>By clicking 'continue,' You will download<br /> this dataset from an external website.</p>
        <div className="modal-button-group">
          <button className="modal-cancel modal-button" onClick={closeModal}>Cancel</button>
          <button className="modal-confirm modal-button" onClick={navigateToSourceUrl}>Continue</button>
        </div>
      </Modal>
      <div>
        <call-to-action-button>
          <a
            data-testid="call-to-action-button"
            className="call-to-action-button"
            role="button"
            rel="noopener noreferrer"
            onClick={handleAction}
          >
            {callToActionText()}
          </a>
        </call-to-action-button>
      </div>
    </div>
  );
}

export default CallToActionButton;
