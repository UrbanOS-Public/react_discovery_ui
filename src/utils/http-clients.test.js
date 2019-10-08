import { AuthenticatedHTTPClient } from "./http-clients"
import createAuth0Client from '@auth0/auth0-spa-js'
import axios from 'axios'

jest.mock('@auth0/auth0-spa-js', () => {
  return jest.fn(() => ({
    isAuthenticated: jest.fn(),
    handleRedirectCallback: jest.fn(() => Promise.resolve({})),
    getTokenSilently: jest.fn(() => Promise.resolve('long-token-from-auth0'))
  }))
})
jest.mock('axios')

describe('http-clients', () => {
  describe('AuthenticatedHTTPClient', () => {
    describe('.get', () => {
      describe('given a token available in auth0', () => {
        let authenticatedClient

        beforeEach(() => {
          
          authenticatedClient = AuthenticatedHTTPClient.getClient()
        })

        it('defaults the base url to the value in global config', () => {
          expect(authenticatedClient.defaults.baseUrl).not.toBe(undefined)
          expect(authenticatedClient.defaults.baseUrl).toBe(window.BASE_URL)
        })

        it('does not set the client to send cross-domain auth headers, etc.', () => {
          expect(authenticatedClient.defaults.withCredentials).not.toBe(true)
        })

        // TODO - we need to maybe not do the default mock of axios anymore, as it makes life hard :/
        it('does not set an auth header', () => {
          expect(authenticatedClient.defaults.headers).toBe(undefined)
        })
      })
      describe('given a token stored in local storage', () => {
        let authenticatedClient
        const JWT = '123456789'

        beforeEach(() => {
          window.localStorage.getItem = jest.fn(_ => JWT)
          authenticatedClient = AuthenticatedHTTPClient.getClient()
        })

        it('defaults the base url to the value in global config', () => {
          expect(authenticatedClient.defaults.baseUrl).not.toBe(undefined)
          expect(authenticatedClient.defaults.baseUrl).toBe(window.BASE_URL)
        })

        it('sets the client to send cross-domain auth headers, etc.', () => {
          expect(authenticatedClient.defaults.withCredentials).toBe(true)
        })

        // TODO - we need to maybe not do the default mock of axios anymore, as it makes life hard :/
        it('sets the auth header with the token', () => {
          expect(authenticatedClient.defaults.headers['Authorization']).toBe(`Bearer ${JWT}`)
        })
      })
    })
  })
  describe('HTTPClient', () => {

  })
})