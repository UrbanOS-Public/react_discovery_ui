import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import OAuthView from './oauth-view'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import LoadingElement from '../../components/generic-elements/loading-element'

describe('OAuth View', () => {
  let subject
  let callLoggedInHandler, handleRedirectCallback, setGlobalErrorStateHandler
  let history

  beforeEach(() => {
    callLoggedInHandler = jest.fn()
    handleRedirectCallback = jest.fn(() => Promise.resolve({ appState: { path: "/test", search: "?blah" } }))
    history = createMemoryHistory(),
    setGlobalErrorStateHandler = jest.fn()
  })

  describe('with an auth code in the URL', () => {
    beforeEach(() => {
      history.replace('/oauth?code=someauth0tokenstring')
      subject = createSubject({
        callLoggedIn: callLoggedInHandler,
        history,
        auth: { handleRedirectCallback },
        setGlobalErrorState: setGlobalErrorStateHandler
      })
    })


    it('calls back to handle the redirect', done => {
      setTimeout(() => {
        expect(handleRedirectCallback).toHaveBeenCalled()
        done()
      })
    })

    it('calls the logged-in endpoint', done => {
      setTimeout(() => {
        expect(callLoggedInHandler).toHaveBeenCalled()
        done()
      })
    })

    it('redirects back to page last visited', done => {
      setTimeout(() => {
        expect(history.location.pathname).toBe('/test')
        expect(history.location.search).toBe('?blah')
        done()
      })
    })

  })

  describe('without an auth code in the url', () => {
    beforeEach(() => {
      history.replace('/oauth')
      subject = createSubject({
        callLoggedIn: callLoggedInHandler,
        history,
        auth: { handleRedirectCallback }
      })
    })

    it('does not call back to handle the redirect', done => {
      setTimeout(() => {
        expect(handleRedirectCallback).not.toHaveBeenCalled()
        done()
      })
    })

    it('does not call the logged-in endpoint', done => {
      setTimeout(() => {
        expect(callLoggedInHandler).not.toHaveBeenCalled()
        done()
      })
    })
  })

  describe('with an error as a return', () => {
    beforeEach(() => {
      history.replace('/oauth?error=unauthorized&error_description=blah')
      subject = createSubject({
        callLoggedIn: callLoggedInHandler,
        history,
        auth: { handleRedirectCallback: handleRedirectCallback, isLoading: false },
        setGlobalErrorState: setGlobalErrorStateHandler
      })
    })

    it('alerts user they must validate their email', () => {
      expect(setGlobalErrorStateHandler).toHaveBeenCalledWith(true, 'blah')
      expect(history.location.pathname).toBe('/')
    })

    it('does not call the logged-in endpoint', done => {
      setTimeout(() => {
        expect(callLoggedInHandler).not.toHaveBeenCalled()
        done()
      })
    })
  })

  describe('with an auth code in the URL but failed call to handle redirect', () => {
    beforeEach(() => {
      history.replace('/oauth?code=someauth0tokenstring')
      subject = createSubject({
        callLoggedIn: callLoggedInHandler,
        history,
        auth: { handleRedirectCallback: jest.fn(() => Promise.reject()), isLoading: false },
        setGlobalErrorState: setGlobalErrorStateHandler
      })
    })

    it('does not call the logged-in endpoint', done => {
      setTimeout(() => {
        expect(callLoggedInHandler).not.toHaveBeenCalled()
        done()
      })
    })

    it('alerts user there was an error', done => {
      setTimeout(() => {
        expect(setGlobalErrorStateHandler).toHaveBeenCalledWith(true, 'Login was not successful. Please try again.')
        expect(history.location.pathname).toBe('/')
        done()
      })
    })
  })

  describe('when loading', () => {
    beforeEach(() => {
      history.replace('/oauth')
      subject = createSubject({
        history,
        auth: { handleRedirectCallback: jest.fn(() => Promise.reject()), isLoading: true }
      })
    })

    it('displays the loading element', () => {
      expect(subject.find(LoadingElement).length).toBe(1)
    })

    it('does not redirect', done => {
      setTimeout(() => {
        expect(history.location.pathname).not.toBe('/')
        done()
      })
    })
  })

  describe('when not loading', () => {
    beforeEach(() => {
      history.replace('/oauth')
      subject = createSubject({
        history,
        auth: { handleRedirectCallback: jest.fn(() => Promise.reject()), isLoading: false }
      })
    })

    it('redirects to root', done => {
      setTimeout(() => {
        expect(history.location.pathname).toBe('/')
        done()
      })
    })
  })
})

const createSubject = (props = {}) => {
  const authDefaultProps = { handleRedirectCallback: jest.fn(() => Promise.resolve()) }
  const defaultProps = {
    callLoggedIn: jest.fn(),
    history: createMemoryHistory(),
    auth: authDefaultProps,
    setGlobalErrorState: jest.fn()
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  let subject
  act(() => {
    subject = mount(
      <Router history={props.history}>
        <OAuthView
          callLoggedIn={propsWithDefaults.callLoggedIn}
          history={propsWithDefaults.history}
          auth={propsWithDefaults.auth}
          setGlobalErrorState={propsWithDefaults.setGlobalErrorState}
        />
      </Router>
    )
  })

  return subject
}
