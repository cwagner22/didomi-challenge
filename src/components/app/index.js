import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'

import GiveConsent from '../give-consent'
import Consents from '../consents'
import SideMenu from '../side-menu'
import Header from '../header'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar
}))

const App = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <Header title="Didomi Challenge" />
        <SideMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Redirect exact from="/" to="/give-consent" />
          <Route exact path="/give-consent" component={GiveConsent} />
          <Route exact path="/collected-consents" component={Consents} />
        </main>
      </div>
    </div>
  )
}

export default App
