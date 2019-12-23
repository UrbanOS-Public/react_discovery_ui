import './alert-component.scss'
import React from 'react'
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'

const AlertComponent = (props) => {
  const {
    errorMessage,
    showAlert,
    closeFunction
  } = props

  return (
    <alert-component>
   { showAlert &&
      <Alert variant="danger" onClose={() => closeFunction()} dismissible>
          <Alert.Heading><div className="errorMessage">{errorMessage}</div></Alert.Heading>
        </Alert>
   }
    </alert-component>
  )
}

AlertComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  closeFunction: PropTypes.func
}

export default AlertComponent
