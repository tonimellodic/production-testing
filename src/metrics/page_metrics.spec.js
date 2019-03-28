const { getLoadDuration, getActionDuration } = require('./page_metrics')
const page = {
  waitForFunction: function (foo, bar) {
    return Promise.resolve()
  },
  evaluate: () => {
    // This should produce a 2000ms duration
    const timing =
      '{ "navigationStart":1000, "requestStart": 2000, "responseEnd": 2100, "loadEventEnd":3000 }'
    return Promise.resolve(timing)
  }
}

describe('Page Metrics', () => {
  it('counts page load duration', () => {
    const expectedDuration = 2 // see page timing mock for details
    return getLoadDuration(page).then(duration =>
      expect(duration).toEqual(expectedDuration)
    )
  })

  it('counts page action duration', () => {
    const expectedDuration = 0.1 // see page timing mock for details
    return getActionDuration(page).then(duration =>
      expect(duration).toEqual(expectedDuration)
    )
  })
})
