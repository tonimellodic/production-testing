const GooglePage = require('../src/pages/google')
const { getLoadDuration } = require('../src/metrics/page_metrics')

describe('google', () => {
  const options = { timeout: 20000 }
  const googlePage = new GooglePage(page, options) // page already initialised

  const reportMetrics = duration => {
    return console.log(`google page took ${duration}s to load`)
  }

  it('loads google page', () => {
    return googlePage
      .goto()
      .then(googlePage.waitForPageLoaded)
      .then(() => getLoadDuration(page, googlePage.options))
      .then(reportMetrics)
  })
})
