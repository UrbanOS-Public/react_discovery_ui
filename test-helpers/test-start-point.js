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
window.BASE_URL = 'http://test.example.com'
