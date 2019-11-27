import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import './oauth-view.scss'
import routes from '../../routes'
import LoadingElement from '../../components/generic-elements/loading-element'

const OAuthView = (props) => {
  const {
    callLoggedIn,
    history, // TODO: still needed
    location,
    auth0
  } = props

  console.log('auth0', auth0)

  const [handled, setHandled] = useState(false)

  useEffect(() => {
    const handleRedirectCallback = async () => {
      console.log('auth0', auth0)
      if (location.search.includes('code=')) { // TODO: is there a better way to check this conditition?
        try {
          const result = await auth0.handleRedirectCallback()
          console.log('handleRedirectCallback', result)
          callLoggedIn()
        } catch (error) {
          console.log('handleRedirectCallback ERROR', error)
        }
      }
      setHandled(true)
    }
    handleRedirectCallback()
  }, [])

  return (
    <oauth-view>
    {
      auth0.isLoading || !handled
        ? <LoadingElement />
        : <Redirect to={routes.root} />
    }
    </oauth-view>
  )
}


export default OAuthView
