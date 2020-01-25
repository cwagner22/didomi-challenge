export const consents = [
  { id: 0, description: 'Receive newsletter' },
  { id: 1, description: 'Be shown targeted ads' },
  { id: 2, description: 'Contribute to anonymous visit statistics' }
]

export let userConsents = [
  {
    name: 'Brad Gibson',
    email: 'brad.gibson@example.com',
    consents: [0, 1]
  },
  {
    name: 'Emma Castillo',
    email: 'EmmaLCastillo@teleworm.us ',
    consents: [1, 2]
  },
  {
    name: 'Ethel Gomez',
    email: 'EthelJGomez@teleworm.us',
    consents: [0, 1, 2]
  },
  {
    name: 'Essie Lacey',
    email: 'EssieBLacey@jourrapide.com',
    consents: [0]
  },
  {
    name: 'Maria Cameron',
    email: 'MariaGCameron@teleworm.us',
    consents: [2]
  }
]
