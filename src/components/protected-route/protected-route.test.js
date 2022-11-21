import ProtectedRoute from './protected-route'
import React from 'react'
import { default as createAuth0Client } from '@auth0/auth0-spa-js'
import { BrowserRouter as Router } from 'react-router-dom'
import { screen, render, waitFor } from '@testing-library/react'

jest.mock('@auth0/auth0-spa-js')

describe('ProtectedRoute component', () => {
  describe('unauthenticated', () => {
    let loginWithRedirect
    beforeEach(() => {
      jest.resetAllMocks()
      createAuth0Client.mockImplementation(() => {
        loginWithRedirect = jest.fn(() => Promise.resolve({}))

        return Promise.resolve({
          isAuthenticated: jest.fn(() => Promise.resolve(false)),
          handleRedirectCallback: jest.fn(() => Promise.resolve({})),
          loginWithRedirect
        })
      })
    })

    it('logs in with redirect when the REQUIRE_API_KEY is true and user is not authenticated', async () => {
      window.REQUIRE_API_KEY = 'true'

      render(<Router><ProtectedRoute exact path='/' component={() => <div>Test Div</div>} /></Router>)

      await waitFor(() => screen.getByText('Test Div'))

      expect(loginWithRedirect).toHaveBeenCalled()
    })

    it('does not attempt to log in when the REQUIRE_API_KEY is false and user is not authenticated', async () => {
      window.REQUIRE_API_KEY = 'false'

      render(<Router><ProtectedRoute exact path='/' component={() => <div>Test Div</div>} /></Router>)

      await waitFor(() => screen.getByText('Test Div'))

      expect(loginWithRedirect).not.toHaveBeenCalled()
    })
  })

  describe('authenticated', () => {
    let loginWithRedirect
    beforeEach(() => {
      createAuth0Client.mockImplementation(() => {
        loginWithRedirect = jest.fn()

        return Promise.resolve({
          isAuthenticated: jest.fn(() => Promise.resolve(true)),
          handleRedirectCallback: jest.fn(() => Promise.resolve({})),
          loginWithRedirect
        })
      })
    })

    it('does not attempt to log in when the REQUIRE_API_KEY is true and user is authenticated', async () => {
      window.REQUIRE_API_KEY = 'true'

      render(<Router><ProtectedRoute exact path='/' component={() => <div>Test Div</div>} /></Router>)

      await waitFor(() => screen.getByText('Test Div'))

      expect(loginWithRedirect).not.toHaveBeenCalled()
    })
  })
})
