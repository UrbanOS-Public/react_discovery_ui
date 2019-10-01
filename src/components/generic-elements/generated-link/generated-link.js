import { generatePath } from "react-router";
import { Link } from 'react-router-dom'
import qs from 'qs'

const GeneratedLink = ({ path, params, queryStringParams, className, children }) => {
  console.log("link params")
  console.log(queryStringParams)
  const to = generatePath(path, params) + qs.stringify(queryStringParams, { addQueryPrefix: true })

  return <Link className={className} to={to}>
    {children}
  </Link>
}

export default GeneratedLink
