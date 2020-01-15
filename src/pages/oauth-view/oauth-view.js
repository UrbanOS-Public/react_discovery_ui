import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import './oauth-view.scss'
import qs from 'qs'
import LoadingElement from '../../components/generic-elements/loading-element'
import PropTypes from 'prop-types'

const hasAuthorizationCodeParameter = search => {
  return qs.parse(search, { ignoreQueryPrefix: true }).hasOwnProperty('code')
}

const hasError = search => {
  return qs.parse(search, { ignoreQueryPrefix: true }).hasOwnProperty('error')
}

const getError = search => {
  return qs.parse(search, { ignoreQueryPrefix: true }).error_description
}

const OAuthView = (props) => {
  const {
    callLoggedIn,
    history: {location: { search }},
    auth: { handleRedirectCallback, isLoading},
    setGlobalErrorState
  } = props

  const [handled, setHandled] = useState(false)
  const [callbackState, setCallbackState] = useState({path: "/", search: ""})

  useEffect(() => {
    if (hasError(search)) {
      setGlobalErrorState(true, getError(search))
    }
  }, [])

  useEffect(() => {
    const onMount = async () => {
      if (hasAuthorizationCodeParameter(search)) {
        try {
          const stateFromCallback = await handleRedirectCallback()
          setCallbackState(stateFromCallback.appState)
          callLoggedIn()
        } 
        catch { 
          setGlobalErrorState(true, "Login was not successful. Please try again.")
        }
      }
      setHandled(true)
    }
    onMount()
  }, [])

  return (
    <oauth-view>
    {
      isLoading || !handled
        ? <LoadingElement />
        : <Redirect to={{ pathname: callbackState.path, search: callbackState.search }} />
    }
    </oauth-view>
  )
  }

OAuthView.propTypes = {
  callLoggedIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    handleRedirectCallback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  }).isRequired,
  setGlobalErrorState: PropTypes.func,
}

export default OAuthView
