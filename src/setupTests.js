// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

// https://github.com/lookfirst/mui-rff/blob/6a67c7e6248cac06ea979a93f15efc41a5395ec3/jest.setup.js
// even with latest react, still running into this on a couple of tests where i could not wrap
// things into an async act. maybe some day this will get fixed, but right now it is just an
// annoying useless warning.
const consoleError = console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes(
        'Warning: An update to %s inside a test was not wrapped in act'
      )
    ) {
      consoleError(...args)
    }
  })
})
