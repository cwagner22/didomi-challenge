import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import GiveConsent from '../give-consent'
import Consents from '../consents'

const App = () => (
  <div>
    <header>
      <Link to="/give-consent">Give consent</Link>
      <Link to="/collected-consents">Collected consents</Link>
    </header>

    <main>
      <Redirect exact from="/" to="/give-consent" />

      <Route exact path="/give-consent" component={GiveConsent} />
      <Route exact path="/collected-consents" component={Consents} />
    </main>
  </div>
)

export default App
