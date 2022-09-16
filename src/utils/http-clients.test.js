import { AuthenticatedHTTPClient } from './http-clients'
import Auth0Client from '../auth/auth0-client-provider'
import mockAxios from 'axios'

describe('http-clients', () => {
  const url = '/api/v1/dog'

  describe('AuthenticatedHTTPClient', () => {
    const token = 'token'
    const fakeAuth0Client = {
      isAuthenticated: () => Promise.resolve(false),
      getTokenSilently: () => Promise.resolve(token)
    }
    beforeEach(() => {
      Auth0Client.get = jest.fn(() => Promise.resolve(fakeAuth0Client))
    })

    describe('.get', () => {
      it('given a custom config, it passes it along to axios', async () => {
        const config = { myCustomConfig: true }

        await AuthenticatedHTTPClient.get(url, config)

        expect(mockAxios.get).toHaveBeenCalledWith(url, config)
      })
      it('given no custom config, it defaults the config passed to axios', async () => {
        await AuthenticatedHTTPClient.get(url)

        expect(mockAxios.get).toHaveBeenCalledWith(url, {})
      })
    })

    describe('.post', () => {
      const body = { stuff: true }
      it('given a custom config, it passes it along to axios', async () => {
        const config = { myCustomConfig: true }

        await AuthenticatedHTTPClient.post(url, body, config)

        expect(mockAxios.post).toHaveBeenCalledWith(url, body, config)
      })
      it('given no custom config, it defaults the config passed to axios', async () => {
        await AuthenticatedHTTPClient.post(url, body)

        expect(mockAxios.post).toHaveBeenCalledWith(url, body, {})
      })
    })

    describe('.initializeClient', () => {
      let client

      describe('isAuthenticated is true', () => {
        beforeEach(async () => {
          fakeAuth0Client.isAuthenticated = () => Promise.resolve(true)
          client = await AuthenticatedHTTPClient.initializeClient()
        })

        it('defaults the base url to the value in global config', () => {
          expect(client.defaults.baseURL).not.toBe(undefined)
          expect(client.defaults.baseURL).toBe(window.API_HOST)
        })

        it('sets the client to send cross-domain auth headers, etc.', () => {
          expect(client.defaults.withCredentials).toBeTruthy()
        })

        it('sends an auth header', () => {
          expect(client.defaults.headers.Authorization).toBe(`Bearer ${token}`)
        })
      })

      describe('isAuthenticated is false', () => {
        beforeEach(async () => {
          fakeAuth0Client.isAuthenticated = () => Promise.resolve(false)
          client = await AuthenticatedHTTPClient.initializeClient()
        })

        it('sets the client to send cross-domain auth headers, etc.', () => {
          expect(client.defaults.withCredentials).toBeFalsy()
        })

        it('sends an auth header', () => {
          expect(client.defaults.headers.Authorization).toBe(undefined)
        })
      })
    })
  })
})
