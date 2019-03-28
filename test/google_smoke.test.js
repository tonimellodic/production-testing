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

  it('suggests searches', done => {
    return googlePage
      .goto()
      .then(() => googlePage.suggest('test suggest'))
      .then(() => done(), err => done.fail(err))
  })

  it('shows search results', done => {
    return googlePage
      .goto()
      .then(() => googlePage.search('test search'))
      .then(() => done(), err => done.fail(err))
  })
})
