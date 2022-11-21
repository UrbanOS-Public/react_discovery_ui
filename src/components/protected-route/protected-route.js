import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import withAuth0 from '../../auth/auth0-wrapper'
import Auth0ClientProvider from '../../auth/auth0-client-provider'

const ProtectedRoute = ({ component, ...args }) => {
  const callbackState = { path: window.location.pathname, search: window.location.search }

  useEffect(() => {
    const loginAuth0 = async () => {
      const client = await Auth0ClientProvider.get()
      const isAuthenticated = await client.isAuthenticated()

      if (!isAuthenticated) {
        await client.loginWithRedirect({ appState: callbackState })
      }
    }

    if (window.REQUIRE_API_KEY === 'true') {
      loginAuth0()
    }
  }, [])

  return (
    <Route
      component={withAuth0(component, {})}
      {...args}
    />
  )
}

export default ProtectedRoute
