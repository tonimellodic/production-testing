const GooglePage = require('../src/pages/google')

describe('Google smoke test', () => {
  const options = { timeout: 5000 }
  const googlePage = new GooglePage(page, options)

  it('loads google page', done => {
    return googlePage
      .goto()
      .then(googlePage.waitForPageLoaded)
      .then(() => done(), err => done.fail(err))
  })
})
