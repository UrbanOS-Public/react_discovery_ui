import React from 'react'
import './save-indicator.scss'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import LoadingElement from '../loading-element'
import GeneratedShareLink from '../generated-share-link'

const SaveIndicator = ({ saving, success, failure, linkPath, linkParams = {} }) => {
  if (saving) {
    return (
      <save-indicator>
        <LoadingElement className='icon' />
        <p>Your visualization is being saved</p>
      </save-indicator>
    )
  }

  if (success) {
    return (
      <save-indicator>
        <CheckCircleIcon className='success icon' />
        <span>
          <p>Your visualization has saved</p>
          {linkPath && <GeneratedShareLink path={linkPath} params={linkParams} className="link-button" />}
        </span>
      </save-indicator>
    )
  }

  if (failure) {
    return (
      <save-indicator>
        <ErrorIcon className='failure icon' />
        <p>Your visualization failed to save</p>
      </save-indicator>
    )
  }

  //TODO: return something else
  return <div>NOTHING</div>
}

export default SaveIndicator
