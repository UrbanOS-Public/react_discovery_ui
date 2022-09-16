import axios from 'axios'
import Auth0Client from '../auth/auth0-client-provider'

class AuthenticatedHTTPClient {
  static cancelTokenSource () {
    return axios.CancelToken.source()
  }

  static async initializeClient () {
    const config = { baseURL: window.API_HOST, headers: {}, validateStatus: false }
    const authClient = await Auth0Client.get()
    const isAuthenticated = await authClient.isAuthenticated()

    if (isAuthenticated) {
      const token = await authClient.getTokenSilently()
      config.headers = Object.assign({}, config.headers, { Authorization: `Bearer ${token}` })
      config.withCredentials = true
    }

    return axios.create(config)
  }

  static async get (url, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.get(url, config)
  }

  static async post (url, body, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.post(url, body, config)
  }

  static async put (url, body, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.put(url, body, config)
  }

  static async delete (url, body, config = {}) {
    const axiosClient = await AuthenticatedHTTPClient.initializeClient()

    return axiosClient.delete(url, body, config)
  }
}

export { AuthenticatedHTTPClient }
