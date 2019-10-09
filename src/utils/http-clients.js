import axios from 'axios'
import Auth0Client from './auth0-client'

class AuthenticatedHTTPClient {
  static async initializeClient() {
    const config = {baseURL: window.API_HOST, headers: {}, validateStatus: false}
    const authClient = await Auth0Client.get()
    const isAuthenticated = await authClient.isAuthenticated()
    
    if(isAuthenticated) {
      const token = await authClient.getTokenSilently()
      config.headers = Object.assign({}, config.headers, {'Authorization': `Bearer ${token}`})
      config.withCredentials = true
    }

    return axios.create(config)
  }

  static async get(url, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.get(url, config)
  }

  static async post(url, body, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.post(url, body, config)
  }
}

export { AuthenticatedHTTPClient }