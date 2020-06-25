import { mount } from 'enzyme'
import { default as createAuth0Client } from '@auth0/auth0-spa-js'
import withAuth0 from './auth0-wrapper'
import { AuthenticatedHTTPClient } from "../utils/http-clients"

jest.mock('@auth0/auth0-spa-js')
jest.mock('axios')

const Wrapped = () => <div />

describe('Auth0 wrapper component', () => {
  let subject, Auth0Wrapper
  let loginWithRedirect, logout

  beforeEach(() => {
    createAuth0Client.mockImplementation(() => {
      loginWithRedirect = jest.fn()
      logout = jest.fn()

      return Promise.resolve({
        isAuthenticated: jest.fn(() => Promise.resolve(false)),
        handleRedirectCallback: jest.fn(() => Promise.resolve({})),
        loginWithRedirect,
        logout
      })
  })

    Auth0Wrapper = withAuth0(Wrapped)
    subject = mount(<Auth0Wrapper />)
  })

  it('initializes the client with the correct values', () => {
    expect(createAuth0Client).toBeCalledWith({
      domain: window.AUTH0_DOMAIN,
      client_id: window.AUTH0_CLIENT_ID,
      audience: window.AUTH0_AUDIENCE,
      redirect_uri: `${window.location.origin}/oauth`
    })
  })

  it('passes a loading flag', () => {
    const wrapped = subject.find(Wrapped)
    expect(wrapped.props().auth.isLoading).not.toBeUndefined()
  })

  it('eventually passes the authenticated flag to the wrapped component', done => {
    setTimeout(() => {
      subject.update()
      const wrapped = subject.find(Wrapped)
      expect(wrapped.props().auth.isAuthenticated).toBe(false)
      done()
    })
  })

  describe('provided handleRedirectCallback', () => {
    it('sets authenticated to true when called', done => {
      let wrapped = subject.find(Wrapped)

      wrapped.props().auth.handleRedirectCallback()

      setTimeout(() => {
        subject.update()
        wrapped = subject.find(Wrapped)
        expect(wrapped.props().auth.isAuthenticated).toBe(true)
        done()
      })
    })
  })
  
  describe('provided logout', () => {
    const returnTo = 'http://example.com'

    beforeEach(() => { 
      AuthenticatedHTTPClient.post = jest.fn()
      AuthenticatedHTTPClient.post.mockImplementationOnce(async () => ({
        status: 200,
        data: 'OK'
      }))

      subject.update()
      let wrapped = subject.find(Wrapped)

      wrapped.props().auth.logout({returnTo})
    })

    it('calls auth0 logout', done => {
      setTimeout(() => {
        expect(logout).toHaveBeenCalledWith({returnTo})
        done()
      })
    })

    it('calls logged-out endpoint on the API', done => {
      setTimeout(() => {
        expect(AuthenticatedHTTPClient.post).toHaveBeenCalledWith('/api/v1/logged-out', '');
        done()
      })
    })
  })
})

