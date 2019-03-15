const PageObject = require('./page_object')

module.exports = class GooglePage extends PageObject {
  constructor (page, options) {
    const selectors = {
      searchbox: 'input[name=q]',
      submit: 'input[name=btnK]'
    }
    super(page, options, selectors, 'https://www.google.com')
  }

  waitForPageLoaded () {
    return this.page.waitForSelector(this.selector.searchbox, this.options)
  }

  search (text) {
    return this.waitForPageLoaded()
      .then(() => this.page.type(this.selector.searchbox, text))
      .then(() => this.page.waitForSelector(this.selector.submit, this.options))
      .then(() => this.page.click(this.selector.submit))
  }
}
