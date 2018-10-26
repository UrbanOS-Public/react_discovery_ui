import './share.scss'

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

const Share = props => {
  const shareLocation = location.href
  const iconSize = 40
  const iconRound = true

  return (
    <share-zone>
      <div className='header'>SHARE DATASET</div>

      <TwitterShareButton url={shareLocation} className="twitter button">
        <TwitterIcon round={iconRound} size={iconSize} />
        <div className="share">Tweet</div>
      </TwitterShareButton>

      <FacebookShareButton url={shareLocation} className="facebook button">
        <FacebookIcon round={iconRound} size={iconSize} />
        <div className="share">Share</div>
        <FacebookShareCount url={shareLocation} className="share-count"/>
      </FacebookShareButton>

      <LinkedinShareButton url={shareLocation} className="linkedin button">
        <LinkedinIcon round={iconRound} size={iconSize} />
        <div className="share">Share</div>
      </LinkedinShareButton>
          
      <CopyToClipboard text={shareLocation}>
        <button tabIndex="0" className='clipboard button'>
          <img style={{width: `${iconSize/2}px`, height: `${iconSize}px`}} src={linkIcon}/>
          <div className="share">Copy Link</div>
        </button>
      </CopyToClipboard>
    </share-zone>
  )
}

export default Share