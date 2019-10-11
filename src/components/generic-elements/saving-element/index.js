import React from 'react'
import './saving-element.scss'
import InlineSVG from 'react-svg-inline'
import loadingIcon from '../../../assets/loadingicon.svg'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'

const SavingElement = ({className = '', success, successClassName = 'success', failure, failureClassName = 'failure'}) => {
  const spinning = !(success || failure)
  
  return (
    <saving-element class={`saving-container ${className}`}>
      {spinning
      ? <InlineSVG svg={loadingIcon} accessibilityDesc='Saving...' />
      : <React.Fragment>
        {success && <CheckCircleIcon className={successClassName} />}
        {failure && <ErrorIcon className={failureClassName} />}
      </React.Fragment>
      }
    </saving-element>
  )
}

export default SavingElement
