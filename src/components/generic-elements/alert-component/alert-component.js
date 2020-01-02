import './alert-component.scss'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types'
import { SnackbarContent } from '@material-ui/core';

const AlertComponent = (props) => {
  const {
    errorMessage,
    showAlert,
    closeFunction
  } = props

  return (
    <alert-component>
     {
     showAlert && 
     <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={showAlert}
        onClose={closeFunction}
        >
        <SnackbarContent
          className='error'
          aria-describedby="client-snackbar"
          message={

            <span id="client-snackbar" className='errorMessage'>
              <ErrorIcon className='errorIcon'/>
              {errorMessage}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={closeFunction}>
              <CloseIcon className='icon' />
            </IconButton>,
          ]}
        />
      </Snackbar>
    }
    </alert-component>
  )
}

AlertComponent.propTypes = {
  errorMessage: PropTypes.string,
  showAlert: PropTypes.bool,
  closeFunction: PropTypes.func.isRequired
}

export default AlertComponent
