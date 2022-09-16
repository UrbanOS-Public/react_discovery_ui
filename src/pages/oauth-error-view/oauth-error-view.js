import { Link } from 'react-router-dom'
import './oauth-error-view.scss'
import qs from 'qs'
import routes from '../../routes.js'

const getError = search => {
  return qs.parse(search, { ignoreQueryPrefix: true }).error_description
}

const OAuthErrorView = () => {
  return (
    <oauth-error-view>
      <h2>Oops! We can't process that request. Please click <a href={routes.root}>here</a> to go back to the home page. </h2>
      <p className='error-message'>{getError(window.location.search)}</p>
    </oauth-error-view>
  )
}

export default OAuthErrorView
