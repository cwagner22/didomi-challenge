import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { userConsents } from './data'

// API config
const axiosInstance = axios.create({
  baseURL: `http://localhost:8080/api/`
})

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axiosInstance)

// Mock API with consents data
// We could paginate the data here if the list of consents is too big
mock.onGet('/consents').reply(200, userConsents)

mock.onPost('/consent').reply(config => {
  handleConsentUpdate(config.data)
  return [201]
})

mock.onPut('/consent').reply(config => {
  handleConsentUpdate(config.data)
  return [204]
})

// Mock function to add or update consent
const handleConsentUpdate = data => {
  const consent = JSON.parse(data)
  const index = userConsents.findIndex(c => c.email === consent.email)

  if (index > -1) {
    // Update consent
    userConsents[index] = consent
  } else {
    // Add consent
    userConsents.push(consent)
  }
}

export default axiosInstance
