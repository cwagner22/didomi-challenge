import api, { mockConsent } from './api'

export const ADD_CONSENT_REQUESTED = 'counter/ADD_CONSENT_REQUESTED'
export const ADD_CONSENT = 'counter/ADD_CONSENT'
export const UPDATE_CONSENT_REQUESTED = 'counter/UPDATE_CONSENT_REQUESTED'
export const UPDATE_CONSENT = 'counter/UPDATE_CONSENT'
export const CONSENTS_REQUESTED = 'counter/CONSENTS_REQUESTED'
export const GET_CONSENTS_SUCCESS = 'counter/GET_CONSENTS_SUCCESS'

const initialState = {
  name: '',
  email: '',
  myConsents: [],
  userConsents: [],
  isAdding: false,
  added: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSENT_REQUESTED: {
      return {
        ...state,
        isAdding: true
      }
    }

    case ADD_CONSENT: {
      const { consent } = action.payload

      return {
        ...state,
        allConsents: [...state.myConsents, consent],
        name: consent.name,
        email: consent.email,
        consents: consent.consents,
        isAdding: false,
        added: true
      }
    }

    case UPDATE_CONSENT: {
      const { consent } = action.payload

      const allConsents = state.userConsents.map((item, index) => {
        if (item.email === consent.email) {
          // Update consent
          return consent
        }
        return item
      })

      return {
        ...state,
        allConsents: allConsents,
        name: consent.name,
        email: consent.email,
        consents: consent.consents,
        isAdding: false,
        added: true
      }
    }

    case GET_CONSENTS_SUCCESS: {
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

export const addConsent = consent => async dispatch => {
  dispatch({
    type: ADD_CONSENT_REQUESTED
  })

  return api
    .post('/consent', consent)
    .then(response => {
      mockConsent(consent)

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
  dispatch({
    type: UPDATE_CONSENT_REQUESTED
  })

  return api
    .put('/consent', consent)
    .then(response => {
      mockConsent(consent)

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
  dispatch({
    type: CONSENTS_REQUESTED
  })

  return api
    .get('/consents')
    .then(response => {
      dispatch({
        type: GET_CONSENTS_SUCCESS,
        payload: { userConsents: response.data }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
