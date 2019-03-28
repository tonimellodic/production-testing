const PageObject = require('./page_object')

module.exports = class GooglePage extends PageObject {
  constructor (page, options) {
    const selectors = {
      searchbox: 'input[name=q]',
      submit: 'input[name=btnK]',
      results: '#resultStats',
      suggestion: '.sbl1 > span'
    }
    super(page, options, selectors, 'https://www.google.com')
  }

  waitForPageLoaded () {
    return this.page.waitForSelector(this.selector.searchbox, this.options)
  }

  waitForSuggestion () {
    return this.page.waitForFunction(
      (selector, t) =>
        document.querySelector(selector) &&
        document.querySelector(selector).innerText !== '',
      this.options,
      this.selector.suggestion
    )
  }

  waitForResults () {
    return this.page.waitForSelector(this.selector.results, this.options)
  }

  typeSearch (text) {
    return this.waitForPageLoaded().then(() =>
      this.page.type(this.selector.searchbox, text)
    )
  }

  suggest (text) {
    const options = { visible: true, ...this.options }
    return this.typeSearch(text).then(this.waitForSuggestion)
  }

  search (text) {
    const options = { visible: true, ...this.options }
    return this.typeSearch(text)
      .then(() => this.page.waitForSelector(this.selector.submit, options))
      .then(() => this.page.click(this.selector.submit))
      .then(this.waitForResults)
  }
}
