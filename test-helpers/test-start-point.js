import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import '@babel/polyfill'

window.React = React
Enzyme.configure({ adapter: new Adapter() })

// suppress errors triggered by plotly
window.URL.createObjectURL = jest.fn()
window.HTMLCanvasElement.prototype.getContext = jest.fn()

window.AUTH0_DOMAIN = 'domainator'
window.AUTH0_CLIENT_ID = 'client_identifinator'
window.AUTH0_AUDIENCE = 'audiencinator'
window.DISC_API_URL = 'http://test.example.com'

// This is the recommended approach for suppressing warnings around not using the `act` function pre React 16.9
const originalError = console.error
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return
  }
  originalError.call(console, ...args)
}
