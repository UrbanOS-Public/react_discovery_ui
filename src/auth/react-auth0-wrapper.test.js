import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Auth0Provider } from './react-auth0-wrapper'
import createAuth0Client from '@auth0/auth0-spa-js'

jest.mock('@auth0/auth0-spa-js', () => {
  return jest.fn(() => ({
    isAuthenticated: jest.fn()
  }))
})

const originalError = console.error

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

describe('auth0 wrapper', () => {

  it('initializes with the correct domain and client ID', done => {
    act(() => {
      mount(<Auth0Provider />)
    })

    setTimeout(() => {
      expect(createAuth0Client).toBeCalledWith({
        domain: window.AUTH0_DOMAIN,
        client_id: window.AUTH0_CLIENT_ID,
        redirect_uri: `${window.location.origin}/oauth`
      })

      done()
    })
  })
})
