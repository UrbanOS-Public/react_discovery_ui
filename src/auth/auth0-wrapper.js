import { useEffect, useState } from "react"
import Auth0ClientProvider from '../auth/auth0-client-provider'
import { AuthenticatedHTTPClient } from "../utils/http-clients"

const withAuth0 = WrappedComponent => {
  const Auth0Wrapper = props => {
    const [isAuthenticated, setAuthenticated] = useState()
    const [isLoading, setLoading] = useState()
    const [auth0Client, setAuth0Client] = useState()
    const callbackState = { path: window.location.pathname, search: window.location.search }

    useEffect(() => {
      const connectAuth0 = async () => {
        setLoading(true)
        const client = await Auth0ClientProvider.get()
        setAuth0Client(client)
        
        const authenticated = await client.isAuthenticated()
        setAuthenticated(authenticated)
        setLoading(false)
      }
      
      connectAuth0()
    }, [])
    
    const handleRedirectCallback = async () => {
      setLoading(true)
      const client = await Auth0ClientProvider.get()
      const callbackReturn = await client.handleRedirectCallback()
      setAuthenticated(true)
      setLoading(false)
      return callbackReturn
    }

    const logout = async (...logoutOptions) => {
      const loggedOutReturn = await AuthenticatedHTTPClient.post('/api/v1/logged-out', '')
      
      auth0Client.logout(...logoutOptions)

      return loggedOutReturn
    }

    const auth0Props = {
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect({appState: callbackState, ...p}),
      logout: logout,
      handleRedirectCallback,
      isAuthenticated,
      isLoading
    }

    return <WrappedComponent auth={auth0Props} {...props} />
  }

  return Auth0Wrapper
}

export default withAuth0
