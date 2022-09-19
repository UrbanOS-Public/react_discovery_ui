import './share.scss'

import React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class Share extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      copyMessage: 'Copy Link'
    }
  }

  render () {
    const shareLocation = window.location.href
    const iconSize = 24
    const iconBgStyle = { fill: 'none' }

    return (
      <share-zone>
        <div className='share-header'>SHARE DATASET</div>

        <TwitterShareButton url={shareLocation} className='twitter button'>
          <TwitterIcon iconBgStyle={iconBgStyle} className='icon' size={iconSize} />
          <div data-testid='social-media-twitter' className='share'>Tweet</div>
        </TwitterShareButton>

        <FacebookShareButton url={shareLocation} className='facebook button'>
          <FacebookIcon iconBgStyle={iconBgStyle} className='icon' size={iconSize} />
          <div data-testid='social-media-facebook' className='share'>Share</div>
        </FacebookShareButton>

        <LinkedinShareButton url={shareLocation} className='linkedin button'>
          <LinkedinIcon iconBgStyle={iconBgStyle} className='icon' size={iconSize} />
          <div data-testid='social-media-linkedin' className='share'>Share</div>
        </LinkedinShareButton>

        <CopyToClipboard style={{ height: `${iconSize}px` }} text={shareLocation} onCopy={() => this.setState({ copyMessage: 'Copied!' })}>
          <button tabIndex='0' className='clipboard button'>
            <div data-testid='clipboard' className='copy'>{this.state.copyMessage}</div>
          </button>
        </CopyToClipboard>
      </share-zone>
    )
  }
}

export default Share
