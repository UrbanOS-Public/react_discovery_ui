import { shallow } from 'enzyme'
import OAuthView from './oauth-view'


const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementation(f => f())
}

describe('OAuth View', () => {
  let subject, callLoggedInHandler

  const { location } = window

  beforeEach(() => {
    callLoggedInHandler = jest.fn()
    subject = createSubject({ callLoggedIn: callLoggedInHandler })
    delete window.location
  })

  afterAll(() => {
    window.location = location
  })

  //should this be in the saga test?
  describe('upon successful login', () => {
    it('calls the logged-in endpoint', () => {
      // mock window location
      window.location = { search: "code=" }
      expect(callLoggedInHandler).toHaveBeenCalled()
    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    callLoggedIn: jest.fn()
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(
    <OAuthView
      callLoggedIn={propsWithDefaults.callLoggedIn}
    />
  )
}
