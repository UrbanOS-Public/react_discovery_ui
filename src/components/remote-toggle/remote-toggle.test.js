import React from 'react'
import { shallow } from 'enzyme'
import RemoteToggle from './remote-toggle'

describe('<RemoteToggle />', () => {
  test('renders', () => {
    const wrapper = shallow(<RemoteToggle />)
    expect(wrapper).toMatchSnapshot()
  })
})
