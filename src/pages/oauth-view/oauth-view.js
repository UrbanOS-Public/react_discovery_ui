import OauthLoginZone from "../../components/oauth-login"
import Auth0ClientProvider from '../../auth/auth0-client-provider.js'
import { useEffect, useState, useContext } from "react"
import axios from 'axios'


const OauthView = () => {
  const [isAuthenticated, setAuthenticated] = useState()
  const [auth0Client, setAuth0] = useState()

  useEffect(() => {
    const connectAuth0 = async () => {
      const auth0Client = await Auth0ClientProvider.get()
      const isAuthenticated = await auth0Client.isAuthenticated()
      setAuthenticated(isAuthenticated)
      setAuth0(auth0Client)


      if (window.location.search.includes("code=")) {
        await auth0Client.handleRedirectCallback()
        auth0Client.getTokenSilently().then(callLoggedIn)
        onRedirectCallback()
        setAuthenticated(true)
      }
    }
    connectAuth0()
  }, [])

  console.log(auth0Client, isAuthenticated)


  return <OauthLoginZone
    isAuthenticated={isAuthenticated}
    loginWithRedirect={(...p) => auth0Client.loginWithRedirect(...p)}
    logout={(...p) => auth0Client.logout(...p)}
  />
}

const onRedirectCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname)

}

const callLoggedIn = token => {
  return axios.post(
    '/api/v1/logged-in',
    '',
    {
      baseURL: window.API_HOST,
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    }
  )
}

export default OauthView
