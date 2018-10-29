import './share.scss'

import React from 'react'
import linkIcon from '../../assets/link.svg'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookShareCount
} from 'react-share';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyMessage: 'Copy Link'
    }
  }

  render() {
    const shareLocation = location.href
    const iconSize = 24
    const iconBgStyle = {fill: 'none'}

    return (
      <share-zone>
        <div className='header'>SHARE DATASET</div>

        <TwitterShareButton url={shareLocation} className="twitter button">
          <TwitterIcon iconBgStyle={iconBgStyle} className='icon' size={iconSize} />
          <div className="share">Tweet</div>
        </TwitterShareButton>

        <FacebookShareButton url={shareLocation} className="facebook button">
          <FacebookIcon iconBgStyle={iconBgStyle} className='icon' size={iconSize} />
          <div className="share">Share</div>
        </FacebookShareButton>

        <LinkedinShareButton url={shareLocation} className="linkedin button">
          <LinkedinIcon iconBgStyle={iconBgStyle} className='icon' size={iconSize} />
          <div className="share">Share</div>
        </LinkedinShareButton>

        <CopyToClipboard style={{height: `${iconSize}px`}} text={shareLocation} onCopy={() => this.setState({copyMessage:"Copied!"})}>
          <button tabIndex="0" className='clipboard button'>
            <div className="copy">{this.state.copyMessage}</div>
          </button>
        </CopyToClipboard>
      </share-zone>
    )
  }
}

export default Share