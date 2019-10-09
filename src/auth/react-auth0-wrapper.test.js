import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import { Auth0Provider } from './react-auth0-wrapper'
import { default as createAuth0Client } from '@auth0/auth0-spa-js'

jest.mock('@auth0/auth0-spa-js')
jest.mock('axios')

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
  const token = 'for-the-subway'
  
  beforeEach(() => {
    createAuth0Client.mockImplementation(() => ({
        isAuthenticated: jest.fn(() => Promise.resolve(false)),
        handleRedirectCallback: jest.fn(() => Promise.resolve({})),
        getTokenSilently: jest.fn(() => Promise.resolve(token))
      })
    )
  })

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
    it('calls the "logged-in" API', done => {
      setSearchString('code=access-is-granted')

      act(() => {
        mount(<Auth0Provider onRedirectCallback={() => {}} />)
      })

      setTimeout(() => {
        expect(axios.post).toHaveBeenCalledWith(
          '/api/v1/logged-in',
          '',
          {
            baseURL: window.API_HOST,
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        )

        done()
      })
    })
  })

  const setSearchString = searchString => {
    Object.defineProperty(window, 'location', { value: { search: searchString}})
  }
})
