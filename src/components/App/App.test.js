import React from 'react'

import App from './index'
import { renderWithRouterAndRedux } from '../../utils/utils-test'

test('renders app properly with a header', () => {
  const { getByText } = renderWithRouterAndRedux(<App />)
  getByText('Didomi Challenge')
})
