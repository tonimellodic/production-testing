const performanceTiming = page => {
  return page
    .evaluate(() => JSON.stringify(window.performance.timing))
    .then(timing => JSON.parse(timing))
}

const getDifferenceOfMetrics = (page, startMetric, endMetric) => {
  const msInASecond = 1000
  return performanceTiming(page).then(
    timing => (timing[endMetric] - timing[startMetric]) / msInASecond
  )
}

const domComplete = (page, options) => {
  return page.waitForFunction(
    'window.performance.timing.domComplete > 0',
    options
  )
}

const getLoadDuration = (page, options) => {
  return domComplete(page, options).then(() =>
    getDifferenceOfMetrics(page, 'navigationStart', 'loadEventEnd')
  )
}

// To measure actions within the same page (no redirect)
// Not currently used in the project
const getActionDuration = page => {
  return getDifferenceOfMetrics(page, 'requestStart', 'responseEnd')
}

module.exports = {
  getLoadDuration,
  getActionDuration
}
