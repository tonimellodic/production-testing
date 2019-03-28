const GooglePage = require('../src/pages/google')
const {
  getLoadDuration,
  getActionDuration
} = require('../src/metrics/page_metrics')

describe('google', () => {
  const options = { timeout: 5000 }
  const googlePage = new GooglePage(page, options)

  const reportMetrics = (duration, action) => {
    return console.log(`google page took ${duration}s to ${action}`)
  }

  it('reports google page load time', done => {
    return googlePage
      .goto()
      .then(googlePage.waitForPageLoaded)
      .then(() => getLoadDuration(page, googlePage.options))
      .then(duration => reportMetrics(duration, 'load'))
      .then(done)
  })

  it('reports google suggest time', done => {
    return googlePage
      .goto()
      .then(() => googlePage.suggest('test suggest'))
      .then(() => getActionDuration(page))
      .then(duration => reportMetrics(duration, 'suggest'))
      .then(done)
  })

  it('reports google search time', done => {
    return googlePage
      .goto()
      .then(() => googlePage.search('test search'))
      .then(() => getLoadDuration(page, googlePage.options))
      .then(duration => reportMetrics(duration, 'find results'))
      .then(done)
  })
})
