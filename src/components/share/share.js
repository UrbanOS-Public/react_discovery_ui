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
          <div data-testid='social-media-twitter'>
            <TwitterShareButton url={shareLocation} className="shareButton" additionalProps={{'aria-label':'Twitter Share'}}>
              <TwitterIcon iconBgStyle={iconBgStyle} round iconFillColor="#00aced" size={iconSize} />
            </TwitterShareButton>
          </div>
          <div data-testid='social-media-facebook'>
            <FacebookShareButton url={shareLocation} className='shareButton' additionalProps={{'aria-label':'Facebook Share'}}>
              <FacebookIcon iconBgStyle={iconBgStyle} round iconFillColor="#3b5998" className='icon' size={iconSize} />
            </FacebookShareButton>
          </div>
          <div data-testid='social-media-linkedin'>
            <LinkedinShareButton url={shareLocation} className='shareButton' additionalProps={{'aria-label':'Linked In Share'}}>
              <LinkedinIcon iconBgStyle={iconBgStyle} round iconFillColor="#3b5998" className='icon' size={iconSize} />
            </LinkedinShareButton>
          </div>
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
