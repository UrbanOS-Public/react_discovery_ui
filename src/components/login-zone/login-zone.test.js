import { render } from 'enzyme'
import LoginZone from './login-zone'
import { BrowserRouter } from 'react-router-dom'

describe('LoginZone ', () => {
  test('Should Render logout when token is present', () => {
    const subject = render(<LoginZone token='blah' logout={jest.fn()} />)
    expect(subject.find('logout-component').length).toEqual(1)
    expect(subject.length).toEqual(1)
  })

  test('Should Render login when token is not present', () => {
    const subject = render(<BrowserRouter><LoginZone logout={jest.fn()} /></BrowserRouter>)
    expect(subject.find('login-component').length).toEqual(1)
    expect(subject.length).toEqual(1)
  })
})
