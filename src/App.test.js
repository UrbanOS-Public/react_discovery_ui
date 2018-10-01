import { shallow } from 'enzyme'
import App from './App'
import Title from './components/title'

describe('App', () => {
  let subject

  beforeEach(() => {
    subject = shallow(<App />)
  })

  test('informs you that you are looking at a count (in redux!)', () => {
    expect(subject.find(Title).props().title).toEqual('Your Current Count (in redux!)')
  })
})
