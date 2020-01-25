import React from 'react'
import { waitForElement, fireEvent, wait, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GiveConsent from './index'
import { renderWithRouterAndRedux } from '../../utils/utils-test'

const consents = [
  { id: 0, description: 'Receive newsletter' },
  { id: 1, description: 'Be shown targeted ads' },
  { id: 2, description: 'Contribute to anonymous visit statistics' }
]

test('renders all consents', () => {
  const { getByText, getAllByRole } = renderWithRouterAndRedux(
    <GiveConsent consents={consents} />
  )

  const inputs = getAllByRole('checkbox')
  expect(inputs.length).toBe(3)

  consents.forEach(async consent => {
    getByText(consent.description)
  })
})

test('submit button disabled until all fields are set', async () => {
  const { getByText, getByLabelText } = renderWithRouterAndRedux(
    <GiveConsent consents={consents} />
  )
  const getButton = async () =>
    (await waitForElement(() => getByText(/Give Consent/i))).closest('button')

  // Check the submit button is initially disabled
  expect(await getButton()).toBeDisabled()

  // Still disabled after entering name and email
  await userEvent.type(getByLabelText(/Name/i), 'Chris W')
  await userEvent.type(getByLabelText(/Email/i), 'chris@example.com')

  expect(await getButton()).toBeDisabled()

  // Enabled after ticking 1 checkbox
  userEvent.click(getByLabelText(/Receive newsletter/i))
  expect(await getButton()).not.toBeDisabled()

  // Disabled after one field has been cleared
  fireEvent.change(getByLabelText(/Name/i), {
    target: {
      value: ''
    }
  })
  expect(await getButton()).toBeDisabled()
})

test('Pressing the submit button pushes to history', async () => {
  const { getByText, getByLabelText, history } = renderWithRouterAndRedux(
    <GiveConsent consents={consents} />
  )
  const pushSpy = jest.spyOn(history, 'push')

  // Fill all data
  await userEvent.type(getByLabelText(/Name/i), 'Chris W')
  await userEvent.type(getByLabelText(/Email/i), 'chris@example.com')

  userEvent.click(getByLabelText(/Receive newsletter/i))
  userEvent.click(getByText(/Give Consent/i).closest('button'))

  // New route has been pushed
  await wait()
  expect(pushSpy).toBeCalledWith('/collected-consents')
})
