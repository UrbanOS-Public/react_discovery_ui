import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import './oauth-view.scss'
import routes from '../../routes'
import qs from 'qs'
import LoadingElement from '../../components/generic-elements/loading-element'
import PropTypes from 'prop-types'

const hasCodeParameter = search => {
  return qs.parse(search, { ignoreQueryPrefix: true }).hasOwnProperty('code')
}

const OAuthView = (props) => {
  const {
    callLoggedIn,
    history: {location: { search }},
    auth0
  } = props

  const [handled, setHandled] = useState(false)

  useEffect(() => {
    const onMount = async () => {
      if (hasCodeParameter(search)) {
          await auth0.handleRedirectCallback()
          callLoggedIn()
      }
      setHandled(true)
    }
    onMount()
  }, [])

  return (
    <oauth-view>
    {
      auth0.isLoading || !handled
        ? <LoadingElement />
        : <Redirect to={{pathname: routes.root}} />
    }
    </oauth-view>
  )
}

OAuthView.propTypes = {
  callLoggedIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth0: PropTypes.shape({
    handleRedirectCallback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  }).isRequired
}

export default OAuthView
