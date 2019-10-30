import OAuthLoginZone from "../../components/oauth-login"
import Auth0ClientProvider from '../../auth/auth0-client-provider.js'
import { useEffect, useState, useContext } from "react"
import axios from 'axios'


const OAuthView = (props) => {
  const {
    callLoggedIn,
    history
  } = props


  const [isAuthenticated, setAuthenticated] = useState()
  const [auth0Client, setAuth0] = useState()

  useEffect(() => {
    const connectAuth0 = async () => {
      const auth0Client = await Auth0ClientProvider.get()
      const isAuthenticated = await auth0Client.isAuthenticated()
      setAuthenticated(isAuthenticated)
      setAuth0(auth0Client)

      if (history.location.search.includes("code=")) {
        await auth0Client.handleRedirectCallback()
        callLoggedIn()
        history.replace("/oauth")
        setAuthenticated(true)
      }
    }
    connectAuth0()
  }, [])

  return (
    <OAuthLoginZone
      isAuthenticated={isAuthenticated}
      loginWithRedirect={(...p) => auth0Client.loginWithRedirect(...p)}
      logout={(...p) => auth0Client.logout(...p)}
    />
  )
}


export default OAuthView
