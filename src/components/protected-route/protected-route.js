import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import withAuth0 from '../../auth/auth0-wrapper'
import Auth0ClientProvider from '../../auth/auth0-client-provider'
import LoadingElement from '../generic-elements/loading-element'
import './protected-route.scss'

const ProtectedRoute = ({ component, ...args }) => {
  const callbackState = { path: window.location.pathname, search: window.location.search }
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loginAuth0 = async () => {
      const client = await Auth0ClientProvider.get()
      const isAuthenticated = await client.isAuthenticated()

      if (!isAuthenticated) {
        await client.loginWithRedirect({ appState: callbackState })
      } else {
        setIsLoading(false)
      }
    }

    if (window.REQUIRE_API_KEY === 'true') {
      loginAuth0()
    }
  }, [])

  if (isLoading) {
    return <LoadingElement className='spinner' />
  }
  return (
    <Route
      component={withAuth0(component, {})}
      {...args}
    />
  )
}

export default ProtectedRoute
