import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Auth0Provider } from './react-auth0-wrapper'
import createAuth0Client from '@auth0/auth0-spa-js'

jest.mock('@auth0/auth0-spa-js', () => {
  return jest.fn(() => ({
    isAuthenticated: jest.fn(),
    handleRedirectCallback: jest.fn(() => Promise.resolve({})),
    getTokenSilently: jest.fn(() => Promise.resolve('long-token-from-auth0'))
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
        audience: window.AUTH0_AUDIENCE,
        redirect_uri: `${window.location.origin}/oauth`
      })

      done()
    })
  })

  describe('upon redirect from successful authentication', () => {
    it('calls the logged-in API', done => {
      setSearchString('code=access-is-granted')

      act(() => {
        mount(<Auth0Provider onRedirectCallback={() => {}} />)
      })


      done()
    })
  })

  const setSearchString = searchString => {
    Object.defineProperty(window, 'location', { value: { search: 'code=a'}})
  }
})
