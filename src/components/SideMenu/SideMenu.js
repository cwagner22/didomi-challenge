import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

import MenuItem from './MenuItem'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}))

const SideMenu = () => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left">
      <div className={classes.toolbar} />
      <nav>
        <Divider />
        <List>
          <MenuItem title="Give Consent" to="/give-consent" />
          <MenuItem title="Consents" to="/collected-consents" />
        </List>
      </nav>
    </Drawer>
  )
}

export default SideMenu
