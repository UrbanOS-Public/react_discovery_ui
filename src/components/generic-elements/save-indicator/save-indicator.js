import React from 'react'
import './save-indicator.scss'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import LoadingElement from '../loading-element'
import ShareLink from '../share-link'

const SaveIndicator = ({ saving, success, failure, linkUrl }) => {
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
          {linkUrl && <ShareLink linkUrl={linkUrl} className="link-button" />}
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

  return <save-indicator />
}

export default SaveIndicator
