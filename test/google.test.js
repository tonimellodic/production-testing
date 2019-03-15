const GooglePage = require('../src/pages/google')

describe('google', () => {
  const options = { timeout: 20000 }
  const googlePage = new GooglePage(page, options) // page already initialised

  it('loads google page', () => {
    return googlePage.goto().then(googlePage.waitForPageLoaded)
  })
})
