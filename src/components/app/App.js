import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import GiveConsent from '../GiveConsent'
import Consents from '../Consents'
import SideMenu from '../side-menu'
import Header from '../header'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8)
  },
  toolbar: theme.mixins.toolbar
}))

const App = () => {
  const classes = useStyles()
  const consents = [
    { id: 0, val: 'Receive newsletter' },
    { id: 1, val: 'Be shown targeted ads' },
    { id: 2, val: 'Contribute to anonymous visit statistics' }
  ]
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <Header title="Didomi Challenge" />
        <SideMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="lg">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Switch>
                <Route
                  exact
                  path="/give-consent"
                  render={props => (
                    <GiveConsent {...props} consents={consents} />
                  )}
                />
                <Route exact path="/collected-consents" component={Consents} />
                <Redirect exact from="/" to="/give-consent" />
              </Switch>
            </Box>
          </Container>
        </main>
      </div>
    </div>
  )
}

export default App
