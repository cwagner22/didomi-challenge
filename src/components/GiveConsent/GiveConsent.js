import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addConsent, updateConsent } from '../../modules/consent'
import PropTypes from 'prop-types'

import { Form } from 'react-final-form'
import { TextField, Checkboxes, makeValidate } from 'mui-rff'
import * as Yup from 'yup'

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },

  fields: {
    display: 'flex',

    '& > *': {
      margin: theme.spacing(1)
    }
  },

  legend: {
    margin: '0 auto'
  },

  list: {
    margin: theme.spacing(2)
  },

  submit: {
    margin: theme.spacing(1)
  }
}))

const GiveConsent = props => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const name = useSelector(state => state.consent.name)
  const email = useSelector(state => state.consent.email)
  const myConsents = useSelector(state => state.consent.myConsents)
  const added = useSelector(state => state.consent.added)

  const renderCheckBoxes = () => {
    const { consents } = props

    const checkboxData = consents.map(c => ({
      label: c.description,
      value: c.id
    }))

    return (
      <Checkboxes
        label="I agree to:"
        name="consents"
        required={true}
        data={checkboxData}
        formLabelProps={{ className: classes.legend }}
        formControlProps={{ className: classes.list }}
      />
    )
  }

  const initialValues = {
    name: name,
    email: email,
    consents: myConsents
  }

  async function onSubmit(values) {
    // Submit consents to API
    const action = added ? updateConsent : addConsent
    dispatch(action(values)).then(() => {
      history.push('/collected-consents')
    })
  }

  // We define our schema based on the same keys as our form
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    consents: Yup.array().min(1)
  })

  // Run the makeValidate function
  const validate = makeValidate(schema)

  return (
    <Paper>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, values, invalid, submittting }) => (
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <div className={classes.fields}>
              <TextField
                id="name-field"
                label="Name"
                name="name"
                variant="outlined"
                required
              />
              <TextField
                id="email-field"
                label="Email address"
                name="email"
                variant="outlined"
                required
              />
            </div>
            <div>{renderCheckBoxes()}</div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={invalid || submittting}
              className={classes.submit}>
              {props.added ? 'Update Consent' : 'Give Consent'}
            </Button>
          </form>
        )}
      />
    </Paper>
  )
}

GiveConsent.propTypes = {
  consents: PropTypes.array.isRequired
}

export default GiveConsent
