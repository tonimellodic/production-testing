const { getLoadDuration } = require('./page_metrics')
const page = {
  waitForFunction: function (foo, bar) {
    return Promise.resolve()
  },
  evaluate: () => {
    // This should produce a 2000ms duration
    const timing = '{ "navigationStart":1000, "loadEventEnd":3000}'
    return Promise.resolve(timing)
  }
}

describe('Page Metrics', () => {
  it('counts page load duration', () => {
    const expectedDuration = 2 // see mock page for details
    return getLoadDuration(page).then(duration =>
      expect(duration).toEqual(expectedDuration)
    )
  })
})
