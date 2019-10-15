import './generated-share-link.scss'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import { generatePath } from "react-router";
import { Link } from 'react-router-dom'

const GeneratedShareLink = ({ path, params }) => {
  const url = generatePath(path, params)
  const absoluteURL = `https://${window.BASE_URL}${url}`

  return (
    <generated-share-link>
      <Link to={url}>{absoluteURL}</Link>
      <CopyToClipboard text={absoluteURL} >
        <FilterNoneIcon className='filter-icon' />
      </CopyToClipboard>
    </generated-share-link>
  )
}

export default GeneratedShareLink
