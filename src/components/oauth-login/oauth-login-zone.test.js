import { mount } from 'enzyme'
import OauthLoginZone from './oauth-login-zone'
import * as auth0 from '../../auth/react-auth0-wrapper'

describe('login', () => {
  let wrapper, button
  let auth0State

  beforeEach(() => {
    auth0State = {
      loginWithRedirect: jest.fn(),
      logout: jest.fn()
    }
    auth0.useAuth0 = jest.fn()
  })

  describe('unauthenticated', () => {
    beforeEach(() => {
      auth0State.isAuthenticated = false
      auth0.useAuth0.mockReturnValue(auth0State)
      wrapper = mount(<OauthLoginZone />)
      button = wrapper.find('button')
    })

    it('has a login button', () => {
      expect(button.length).toBe(1)
      expect(button.text()).toBe("LOG IN")
    })

    it('logs in with redirect when the button is clicked', () => {
      button.simulate('click')

      expect(auth0State.loginWithRedirect).toHaveBeenCalled()
    })
  })

  describe('authenticated', () => {
    beforeEach(() => {
      auth0State.isAuthenticated = true
      auth0.useAuth0.mockReturnValue(auth0State)
      wrapper = mount(<OauthLoginZone />)
      button = wrapper.find('button')
    })

    it('has a logout button', () => {
      expect(button.length).toBe(1)
      expect(button.text()).toBe("LOG OUT")
    })

    it('logs out when the button is clicked', () => {
      button.simulate('click')

      expect(auth0State.logout).toHaveBeenCalled()
    })
  })
})
