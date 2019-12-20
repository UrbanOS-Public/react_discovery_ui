import './alert-component.scss'
import React from 'react'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'


const AlertComponent = (props) => {
  const {
    errorMessage
  } = props

  const [show, setShow] = useState(true);

  return (
    <alert-component>
   { show &&
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading><div className="errorMessage">{errorMessage}</div></Alert.Heading>
        </Alert>
   }
    </alert-component>
  )
}

export default AlertComponent
