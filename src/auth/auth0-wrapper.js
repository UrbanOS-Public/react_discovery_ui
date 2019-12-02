import { useEffect, useState } from "react"
import Auth0ClientProvider from '../auth/auth0-client-provider'

const withAuth0 = WrappedComponent => {
  const Auth0Wrapper = props => {
    const [isAuthenticated, setAuthenticated] = useState()
    const [isLoading, setLoading] = useState()
    const [auth0Client, setAuth0Client] = useState()

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
      await client.handleRedirectCallback()
      setAuthenticated(true)
      setLoading(false)
    };

    const auth0Props = {
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      logout: (...p) => auth0Client.logout(...p),
      handleRedirectCallback,
      isAuthenticated,
      isLoading
    }

    return <WrappedComponent auth={auth0Props} {...props} />
  }

  return Auth0Wrapper
}

export default withAuth0