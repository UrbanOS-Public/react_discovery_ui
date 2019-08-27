import { generatePath } from "react-router";
import { Link } from 'react-router-dom'

const GeneratedLink = ({ path, params, className, children }) => {
  return <Link className={className} to={generatePath(path, params)}>
    {children}
  </Link>
}

export default GeneratedLink
