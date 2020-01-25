import api from './api'

// Action Types
export const ADD_CONSENT = 'counter/ADD_CONSENT'
export const UPDATE_CONSENT = 'counter/UPDATE_CONSENT'
export const GET_CONSENTS = 'counter/GET_CONSENTS'

const initialState = {
  name: '',
  email: '',
  myConsents: [],
  userConsents: [],
  added: false
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSENT:
    case UPDATE_CONSENT: {
      const { consent } = action.payload
      return {
        ...state,
        myConsents: consent.consents,
        name: consent.name,
        email: consent.email,
        added: true
      }
    }

    case GET_CONSENTS: {
      const { userConsents } = action.payload
      return {
        ...state,
        userConsents
      }
    }

    default:
      return state
  }
}

// Thunk Action Creators
export const addConsent = consent => async dispatch => {
  return api
    .post('/consent', consent)
    .then(response => {
      dispatch({
        type: ADD_CONSENT,
        payload: { consent }
      })
    })
    .catch(error => {
      console.log(error)
    })
}

export const updateConsent = consent => async dispatch => {
  return api
    .put('/consent', consent)
    .then(response => {
      dispatch({
        type: UPDATE_CONSENT,
        payload: { consent }
      })
    })
    .catch(error => {
      console.log(error)
    })
}

export const getConsents = () => async dispatch => {
  return api
    .get('/consents')
    .then(response => {
      dispatch({
        type: GET_CONSENTS,
        payload: { userConsents: response.data }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
