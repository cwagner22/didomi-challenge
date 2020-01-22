import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
import { Router } from 'react-router-dom'
import store, { history } from './store'
import App from './components/app'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App />
      </div>
    </Router>
  </Provider>,
  target
)
