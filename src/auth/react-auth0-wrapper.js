import React, { useState, useEffect, useContext } from 'react'
import Auth0Client from '../utils/auth0-client'
import axios from 'axios'

const DEFAULT_REDIRECT_CALLBACK = () => {
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

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await Auth0Client.get()
      setAuth0(auth0FromHook)

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        auth0FromHook.getTokenSilently().then(callLoggedIn)
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
  }, [])

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
