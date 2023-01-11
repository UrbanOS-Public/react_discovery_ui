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
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

class Share extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      copyMessage: 'Copy Link'
    }
  }

  render() {
    const shareLocation = window.location.href
    const iconSize = 32
    const iconBgStyle = {}

    return (
      <share-zone>
        <div className='share-header'>SHARE DATASET</div>
        <div className='share-icons'>
          <TwitterShareButton url={shareLocation} className="shareButton">
            <TwitterIcon data-testid='social-media-twitter' iconBgStyle={iconBgStyle} round iconFillColor="#00aced" size={iconSize} />
          </TwitterShareButton>

          <FacebookShareButton url={shareLocation} className='shareButton'>
            <FacebookIcon data-testid='social-media-facebook' iconBgStyle={iconBgStyle} round iconFillColor="#3b5998" className='icon' size={iconSize} />
          </FacebookShareButton>

          <LinkedinShareButton url={shareLocation} className='shareButton'>
            <LinkedinIcon iconBgStyle={iconBgStyle} round iconFillColor="#3b5998" className='icon' size={iconSize} />
          </LinkedinShareButton>
        </div>
        <CopyToClipboard style={{ height: `${iconSize}px` }} text={shareLocation} onCopy={() => this.setState({ copyMessage: 'Copied!' })}>
          <button tabIndex='0' className='primary-background-color clipboard button'>
            <FileCopyOutlinedIcon />
            <div data-testid='clipboard' className='copy'>{this.state.copyMessage}</div>
          </button>
        </CopyToClipboard>
      </share-zone>
    )
  }
}

export default Share
