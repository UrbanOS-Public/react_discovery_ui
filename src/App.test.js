import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  let subject

  beforeEach(() => {
    subject = shallow(<App />)
  })

  test('celebrates our success', () => {
    expect(subject.find('.classy').text()).toEqual('We did it!')
  })
})