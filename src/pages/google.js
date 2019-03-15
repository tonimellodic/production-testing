const PageObject = require('./page_object')

module.exports = class GooglePage extends PageObject {
  constructor (page, options) {
    const selectors = {
      searchbox: 'input[name=q]'
    }
    super(page, options, selectors, 'https://www.google.com')
  }

  waitForPageLoaded () {
    return this.page.waitForSelector(this.selector.searchbox, this.options)
  }
}
