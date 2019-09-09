
import App from './App.js'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
import TagManager from 'react-gtm-module'
window.React = React

const tagManagerArgs = {
  gtmId: window.GTM_ID
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(<App />, document.getElementById('root'));
