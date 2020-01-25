import React from 'react'
import { waitForElement } from '@testing-library/react'

import Consents from './index'
import { renderWithRedux } from '../../utils/utils-test'

test('renders 2 consents per page', async () => {
  const { getByText, getAllByRole, debug } = renderWithRedux(<Consents />)
  await waitForElement(() => getByText(/Brad Gibson/i))
  const rowsPerPage = 2
  expect(getAllByRole('row').length).toBe(rowsPerPage + 2) // rowsPerPage + header + footer rows
})
