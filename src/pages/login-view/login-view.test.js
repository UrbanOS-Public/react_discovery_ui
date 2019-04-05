import { shallow } from 'enzyme'
import LoginView from './login-view'

describe('login view', () => {
  let subject, loginSpy
  const fakeHistory = jest.fn()

  beforeEach(() => {
    loginSpy = jest.fn()
    subject = shallow(<LoginView login={loginSpy} lastAttemptFailed={false} history={fakeHistory} />)
  })

  it('when the login button is clicked, a login is dispatched with creds', () => {
    const username = 'lettuce'
    const password = 'tarpsoff123'

    subject.find('.username').simulate('change', { target: { value: username } })
    subject.find('.password').simulate('change', { target: { value: password } })
    subject.find('.submit').simulate('click')

    expect(loginSpy).toHaveBeenCalledWith({ username: username, password: password, history: fakeHistory })
  })
})
