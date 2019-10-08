import axios from 'axios'
import createAuth0Client from '@auth0/auth0-spa-js'
import routes from '../routes'
import { Auth0Client } from './auth0-client'

const auth0Options = {
  domain: window.AUTH0_DOMAIN,
  client_id: window.AUTH0_CLIENT_ID,
  audience: window.AUTH0_AUDIENCE,
  redirect_uri: `${window.location.origin}${routes.oauth}`
}

class AuthenticatedHTTPClient {
  constructor() {
  }

  async get(url, options = {}) {
    console.log("getting", url, options)
    const axiosClient = axios.create({baseUrl: window.BASE_URL})
    const authClient = await Auth0Client.create()
    console.log("http client auth client", authClient)
      // debugger
    const isAuthenticated = await authClient.isAuthenticated()
    
    if(isAuthenticated) {
      console.log("are authenticated?")
      const token = await authClient.getTokenSilently()
      console.log("TOKEN", token)
      options.headers['Authorization'] = `Bearer ${token}`
      options.withCredentials = true
    } else {
      console.log("not authed")
    }  

    return axiosClient.get(url, options)
  }

  async post(url, body, options = {}) {
    const isAutenticated = await this.authClient.isAutenticated()

    if(isAutenticated) {
      const token = await this.authClient.getTokenSilently()
      options.headers['Authorization'] = `Bearer ${token}`
      options.withCredentials = true
    }    
    
    return this.axiosClient.post(url, body, options)
  }
}

class HTTPClient {
  constructor() {
    this.setClient()
  }

  setClient() {
    this.client =
      axios.create({
        baseUrl: window.BASE_URL,
      })
  }

  getClient() {
    return this.client
  }
}

const authClient = new AuthenticatedHTTPClient()
const client = new HTTPClient()

export { authClient as AuthenticatedHTTPClient, client as HTTPClient }