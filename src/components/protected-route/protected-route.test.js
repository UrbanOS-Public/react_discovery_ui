import ProtectedRoute from './protected-route'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { screen, render, waitFor } from '@testing-library/react'
import auth0ClientProvider from '../../auth/auth0-client-provider'

jest.mock('@auth0/auth0-spa-js')

describe('ProtectedRoute component', () => {
  describe('unauthenticated', () => {
    const mockLoginWithRedirect = jest.fn(() => Promise.resolve({}))
    beforeEach(() => {
      jest.resetAllMocks()
      jest.spyOn(auth0ClientProvider, 'get').mockImplementation(() => Promise.resolve({
        isAuthenticated: jest.fn(() => Promise.resolve(false)),
        handleRedirectCallback: jest.fn(() => Promise.resolve({})),
        loginWithRedirect: mockLoginWithRedirect
      }))
    })

    it('logs in with redirect when the REQUIRE_API_KEY is true and user is not authenticated', async () => {
      window.REQUIRE_API_KEY = 'true'

      render(<Router><ProtectedRoute exact path='/' component={() => <div>Test Div</div>} /></Router>)

      await waitFor(() => screen.getByTestId('loading-spinner'))

      expect(mockLoginWithRedirect).toHaveBeenCalled()
    })

    it('does not attempt to log in when the REQUIRE_API_KEY is false and user is not authenticated', async () => {
      window.REQUIRE_API_KEY = 'false'

      render(<Router><ProtectedRoute exact path='/' component={() => <div>Test Div</div>} /></Router>)

      await waitFor(() => screen.getByTestId('loading-spinner'))

      expect(mockLoginWithRedirect).not.toHaveBeenCalled()
    })
  })

  describe('authenticated', () => {
    const mockLoginWithRedirect = jest.fn(() => Promise.resolve({}))
    beforeEach(() => {
      jest.resetAllMocks()
      jest.spyOn(auth0ClientProvider, 'get').mockImplementation(() => Promise.resolve({
        isAuthenticated: jest.fn(() => Promise.resolve(true)),
        handleRedirectCallback: jest.fn(() => Promise.resolve({})),
        loginWithRedirect: mockLoginWithRedirect
      }))
    })

    it('does not attempt to log in when the REQUIRE_API_KEY is true and user is authenticated', async () => {
      window.REQUIRE_API_KEY = 'true'

      render(<Router><ProtectedRoute exact path='/' component={() => <div>Test Div</div>} /></Router>)

      await waitFor(() => screen.getByText('Test Div'))

      expect(mockLoginWithRedirect).not.toHaveBeenCalled()
    })
  })
})
