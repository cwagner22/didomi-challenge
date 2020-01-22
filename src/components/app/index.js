import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import GiveConsent from '../give-consent'
import Consents from '../consents'
import SideMenu from '../side-menu'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
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
