import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { userConsents } from './data'

const axiosInstance = axios.create({
  baseURL: `http://localhost:8080/api/`
})

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axiosInstance)

mock.onGet('/consents').reply(200, userConsents)

mock.onPost('/consent').reply(200)

export default axiosInstance

export function mockConsent(consent) {
  const index = userConsents.findIndex(c => c.email === consent.email)

  if (index > -1) {
    // Update consent
    userConsents[index] = consent
  } else {
    // Add consent
    userConsents.push(consent)
  }
}
