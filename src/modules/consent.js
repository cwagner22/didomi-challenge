import api from './api'

export const ADD_CONSENT_REQUESTED = 'counter/ADD_CONSENT_REQUESTED'
export const ADD_CONSENT = 'counter/ADD_CONSENT'
export const CONSENTS_REQUESTED = 'counter/CONSENTS_REQUESTED'
export const GET_CONSENTS_SUCCESS = 'counter/GET_CONSENTS_SUCCESS'

const initialState = {
  consents: [],
  isAdding: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSENT_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD_CONSENT:
      const { consent } = action.payload

      return {
        ...state,
        consents: [...state.consents, consent],
        isAdding: false
      }

    case GET_CONSENTS_SUCCESS:
      const { consents } = action.payload
      return {
        ...state,
        consents
      }

    default:
      return state
  }
}

// export const increment = () => {
//   return dispatch => {
//     dispatch({
//       type: ADD_CONSENT_REQUESTED
//     })

//     dispatch({
//       type: ADD_CONSENT_REQUESTED
//     })
//   }
// }

export const addConsent = consent => async dispatch => {
  dispatch({
    type: ADD_CONSENT_REQUESTED
  })

  // return new Promise(function(resolve) {
  //   setTimeout(resolve.bind(null), 4000)
  // })
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
