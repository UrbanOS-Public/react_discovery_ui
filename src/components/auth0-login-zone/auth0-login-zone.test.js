import { mount } from 'enzyme'
import { Auth0LoginZone as Component } from './auth0-login-zone'
import LoadingElement from '../generic-elements/loading-element'
import { BrowserRouter as Router } from 'react-router-dom'
import * as device from 'react-device-detect'

describe('OauthLoginZone component', () => {
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
      expect(button.text()).toMatch('Log in to your account')
    })

    it('logs in with redirect when the button is clicked', () => {
      button.simulate('click')

      expect(loginHandler).toHaveBeenCalled()
    })

    it('does not have a loading element', () => {
      expect(subject.find(LoadingElement).length).toBe(0)
    })
  })

  describe('authenticated', () => {
    beforeEach(() => {
      device.isMobile = false
      subject = createSubject({ isAuthenticated: true, loginWithRedirect: loginHandler, logout: logoutHandler })
      button = subject.find('button')
    })

    it('has an account dropdown', () => {
      expect(button.length).toBe(1)
      expect(button.text()).toMatch('My Account')
    })

    it('displays account dropdown on mouse enter', () => {
      button.simulate('mouseEnter')
      const menuItems = subject.find('li')
      expect(menuItems.length).not.toBe(0)
    })

    it('does not toggle account dropdown on mouse click when not on mobile', () => {
      button.simulate('click')
      const menuItems = subject.find('li')
      expect(menuItems.length).toBe(0)
    })

    describe('account menu', () => {
      beforeEach(() => {
        button.simulate('mouseEnter')
      })

      it('has the expected menu items', () => {
        window.REGENERATE_API_KEY_FF = 'true'
        subject = createSubject({ isAuthenticated: true, loginWithRedirect: loginHandler, logout: logoutHandler })
        button = subject.find('button')
        button.simulate('mouseEnter')
        const menuItems = subject.find('li')
        expect(menuItems.length).toBe(3)
        expect(menuItems.at(0).text()).toMatch('Workspaces')
        expect(menuItems.at(1).text()).toMatch('API Key')
        expect(menuItems.at(2).text()).toMatch('Log Out')
      })

      it('does not contain API Key when FF is not active', () => {
        window.REGENERATE_API_KEY_FF = 'false'
        subject = createSubject({ isAuthenticated: true, loginWithRedirect: loginHandler, logout: logoutHandler })
        button = subject.find('button')
        button.simulate('mouseEnter')
        const menuItems = subject.find('li')
        expect(menuItems.length).toBe(2)
        expect(menuItems.at(0).text()).toMatch('Workspaces')
        expect(menuItems.at(1).text()).toMatch('Log Out')
      })

      it('logs out with the correct "returnTo" URL when the button is clicked', () => {
        const logOut = subject.find('#logout-button')
        logOut.simulate('click')

        expect(logoutHandler).toHaveBeenCalledWith({ returnTo: `${window.location.origin}/oauth` })
      })

      it('has a link to the workspaces page', () => {
        const link = subject.find('a')
        expect(link.at(0).props().href).toMatch('/user')
      })

      it('has a link to the apikey page', () => {
        window.REGENERATE_API_KEY_FF = 'true'
        subject = createSubject({ isAuthenticated: true, loginWithRedirect: loginHandler, logout: logoutHandler })
        button = subject.find('button')
        button.simulate('mouseEnter')
        const link = subject.find('a')
        expect(link.at(1).props().href).toMatch('/apiKey')
      })

      it('does not have a loading element', () => {
        expect(subject.find(LoadingElement).length).toBe(0)
      })

      it('closes on mouse exit', () => {
        button.simulate('mouseLeave')
        const menuItems = subject.find('li')
        expect(menuItems.length).toBe(0)
      })
    })

    describe('account menu on mobile', () => {
      beforeEach(() => {
        device.isMobile = true
        subject = createSubject({ isAuthenticated: true, loginWithRedirect: loginHandler, logout: logoutHandler })
        button = subject.find('button')
      })

      it('toggles account dropdown on mouse click', () => {
        button.simulate('click')
        let menuItems = subject.find('li')
        expect(menuItems.length).not.toBe(0)

        button.simulate('click')
        menuItems = subject.find('li')
        expect(menuItems.length).toBe(0)
      })

      it('does not display account dropdown on mouse enter', () => {
        button.simulate('mouseEnter')
        const menuItems = subject.find('li')
        expect(menuItems.length).toBe(0)
      })
    })
  })

  describe('loading', () => {
    beforeEach(() => {
      subject = createSubject({ isLoading: true })
    })

    it('has a loading element', () => {
      expect(subject.find(LoadingElement).length).toBe(1)
    })

    it('does not have a button', () => {
      expect(subject.find('button').length).toBe(0)
    })
  })
})

const createSubject = (authProps = {}) => {
  const defaultAuthProps = {
    isAuthenticated: false,
    isLoading: false,
    loginWithRedirect: jest.fn(),
    logout: jest.fn()
  }

  const auth0PropsWithDefaults = Object.assign({}, defaultAuthProps, authProps)

  return mount(
    <Router>
      <Component
        auth={{
          isAuthenticated: auth0PropsWithDefaults.isAuthenticated,
          isLoading: auth0PropsWithDefaults.isLoading,
          loginWithRedirect: auth0PropsWithDefaults.loginWithRedirect,
          logout: auth0PropsWithDefaults.logout
        }}
      />
    </Router>
  )
}
