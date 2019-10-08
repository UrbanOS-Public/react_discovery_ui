import axios from 'axios'
import Auth0Client from './auth0-client'

class AuthenticatedHTTPClient {
  static async initializeClient() {
    const config = {baseURL: window.API_HOST, headers: {}, validateStatus: false}
    const authClient = await Auth0Client.create()
    const isAuthenticated = await authClient.isAuthenticated()
    
    if(isAuthenticated) {
      const token = await authClient.getTokenSilently()
      config.headers = Object.assign({}, config.headers, {'Authorization': `Bearer ${token}`})
      config.withCredentials = true
    }
    
    return axios.create(config)
  }

  async get(url, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.get(url, config)
  }

  async post(url, body, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.post(url, body, config)
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