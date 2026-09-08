import ReactDiscoveryUI from './ReactDiscoveryUI.js'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
import TagManager from 'react-gtm-module'
window.React = React

if (window.GTM_ID) {
  TagManager.initialize({ gtmId: window.GTM_ID })
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<ReactDiscoveryUI />, document.getElementById('root'))
