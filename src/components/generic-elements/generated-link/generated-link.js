import { generatePath } from "react-router";
import { Link } from 'react-router-dom'
import qs from 'qs'

const GeneratedLink = ({ path, params, queryStringParams, className, children }) => {
  const to = generatePath(path, params) + qs.stringify(queryStringParams, { addQueryPrefix: true })

  return <Link className={className} to={to}>
    {children || to}
  </Link>
}

export default GeneratedLink
