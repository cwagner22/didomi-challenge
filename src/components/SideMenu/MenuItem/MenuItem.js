import React from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'

const MenuItem = props => {
  return (
    <ListItem
      button
      key={props.title}
      to={props.to}
      component={NavLink}
      activeClassName="Mui-selected"
      exact>
      <ListItemText primary={props.title} />
    </ListItem>
  )
}

MenuItem.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string
}

export default MenuItem
