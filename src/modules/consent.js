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
  allConsents: [],
  isAdding: false,
  added: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSENT_REQUESTED:
      return {
        ...state,
        isAdding: true
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

      const allConsents = state.allConsents.map((item, index) => {
        if (item.email !== consent.email) {
          // This isn't the item we care about - keep it as-is
          return item
        }
        // Otherwise, this is the one we want - return an updated value
        return consent
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

    case GET_CONSENTS_SUCCESS:
      const { consents } = action.payload
      return {
        ...state,
        allConsents: consents
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
      dispatch({
        type: ADD_CONSENT,
        payload: { consent }
      })
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      mockConsent(consent)
    })
}

export const updateConsent = consent => async dispatch => {
  dispatch({
    type: UPDATE_CONSENT_REQUESTED
  })

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
    .finally(() => {
      mockConsent(consent)
    })
}

export const getConsents = () => async dispatch => {
  dispatch({
    type: CONSENTS_REQUESTED
  })

  return api
    .get('/consents')
    .then(response => {
      const { consents } = response.data
      console.log(consents)
      dispatch({
        type: GET_CONSENTS_SUCCESS,
        payload: { consents }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
