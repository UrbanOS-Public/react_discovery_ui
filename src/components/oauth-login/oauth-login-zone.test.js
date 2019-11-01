import { mount } from 'enzyme'
import OauthLoginZone from './oauth-login-zone'

describe('login', () => {
  let subject, button, loginHandler, logoutHandler

  beforeEach(() => {
    loginHandler = jest.fn()
    logoutHandler = jest.fn()
  })

  describe('unauthenticated', () => {
    beforeEach(() => {
      subject = createSubject({ isAuthenticated: false, loginWithRedirect: loginHandler, logout: logoutHandler })
      button = subject.find('button')
    })

    it('has a login button', () => {
      expect(button.length).toBe(1)
      expect(button.text()).toBe("LOG IN")
    })

    it('logs in with redirect when the button is clicked', () => {
      button.simulate('click')

      expect(loginHandler).toHaveBeenCalled()
    })
  })

  describe('authenticated', () => {
    beforeEach(() => {
      subject = createSubject({ isAuthenticated: true, loginWithRedirect: loginHandler, logout: logoutHandler })
      button = subject.find('button')
    })

    it('has a logout button', () => {
      expect(button.length).toBe(1)
      expect(button.text()).toBe("LOG OUT")
    })

    it('logs out with the correct "returnTo" URL when the button is clicked', () => {
      button.simulate('click')

      expect(logoutHandler).toHaveBeenCalledWith({ returnTo: `${window.location.origin}/oauth` })
    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    isAuthenticated: false,
    loginWithRedirect: jest.fn(),
    logout: jest.fn()
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return mount(
    <OauthLoginZone
      isAuthenticated={propsWithDefaults.isAuthenticated}
      loginWithRedirect={propsWithDefaults.loginWithRedirect}
      logout={propsWithDefaults.logout}
    />
  )
}
