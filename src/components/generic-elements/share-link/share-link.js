import './share-link.scss'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import { Link } from 'react-router-dom'

const ShareLink = ({linkUrl}) => {
  const absoluteURL = `${window.location.origin}${linkUrl}`

  return (
    <share-link>
      <Link to={linkUrl}>{absoluteURL}</Link>
      <CopyToClipboard text={absoluteURL} >
        <FilterNoneIcon className='filter-icon' />
      </CopyToClipboard>
    </share-link>
  )
}

export default ShareLink
