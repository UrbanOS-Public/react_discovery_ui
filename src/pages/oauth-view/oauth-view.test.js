import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import OAuthView from './oauth-view'
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

describe('OAuth View', () => {
  let subject
  const callLoggedInHandler = jest.fn()

  createAuth0Client.mockImplementation(() => ({
    isAuthenticated: jest.fn(() => Promise.resolve(false)),
    handleRedirectCallback: jest.fn(() => Promise.resolve({}))
  }))

  describe('upon successful login', () => {
    beforeEach(() => {
      subject = createSubject({
        callLoggedIn: callLoggedInHandler,
        history: {
          location: {
            search: 'code=someauth0tokenstring'
          }
        }
      })

    })

    it('calls the logged-in endpoint', () => {
      expect(callLoggedInHandler).toHaveBeenCalled()
    })
  })


  describe('upon initial render', () => {
    beforeEach(() => {
      subject = createSubject({
        callLoggedIn: callLoggedInHandler,
        history: {
          location: {
            search: ''
          }
        }
      })
    })

    it('initializes with the correct domain and client ID', () => {
      expect(createAuth0Client).toBeCalledWith({
        domain: window.AUTH0_DOMAIN,
        client_id: window.AUTH0_CLIENT_ID,
        audience: window.AUTH0_AUDIENCE,
        redirect_uri: `${window.location.origin}/oauth`
      })

    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    callLoggedIn: jest.fn(),
    history: {}
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  act(() => {
    mount(
      <OAuthView
        callLoggedIn={propsWithDefaults.callLoggedIn}
        history={propsWithDefaults.history}
      />
    )
  })
}
