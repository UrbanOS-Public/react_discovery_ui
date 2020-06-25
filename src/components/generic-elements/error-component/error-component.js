import './error-component.scss'
import React from "react"
import ErrorOutline from '@material-ui/icons/ErrorOutline'

const ErrorComponent = props => {
  return (
    <error-component>
      <div className='error-container'>
        <ErrorOutline className='error-icon' />
        <div data-testid="error-text" className='error-text'>{props.errorText}</div>
      </div>
    </error-component>
  )
}

export default ErrorComponent
