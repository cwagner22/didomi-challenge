import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosInstance = axios.create({
  baseURL: `http://localhost:8080/api/`
})

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axiosInstance)

const consents = [
  {
    name: 'Brad Gibson',
    email: 'brad.gibson@example.com',
    consents: ['Receive Newsletter']
  },
  {
    name: 'Emma Castillo',
    email: 'EmmaLCastillo@teleworm.us ',
    consents: [
      'Be shown targeted ads',
      'Contribute to anonymous visit statistics'
    ]
  },
  {
    name: 'Ethel Gomez',
    email: 'EthelJGomez@teleworm.us',
    consents: ['Receive Newsletter', 'Contribute to anonymous visit statistics']
  },
  {
    name: 'Eric Bailey',
    email: 'EricABailey@jourrapide.com',
    consents: ['Receive Newsletter']
  },
  {
    name: 'Essie Lacey',
    email: 'EssieBLacey@jourrapide.com',
    consents: [
      'Receive Newsletter',
      'Be shown targeted ads',
      'Contribute to anonymous visit statistics'
    ]
  },
  {
    name: 'Maria Cameron',
    email: 'MariaGCameron@teleworm.us',
    consents: ['Receive Newsletter', 'Be shown targeted ads']
  }
]

mock.onGet('/consents').reply(200, {
  consents
})

mock.onPost('/consent').reply(200)

export default axiosInstance
