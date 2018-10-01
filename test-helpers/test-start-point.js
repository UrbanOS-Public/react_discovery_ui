import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

window.React = React
Enzyme.configure({ adapter: new Adapter() })
