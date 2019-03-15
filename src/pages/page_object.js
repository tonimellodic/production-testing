const autoBind = require('auto-bind')
//const skipPageErrors = require('../skip_page_errors')
//const emulate3G = require('./emulate_3G')

module.exports = class PageObject {
  /**
   * Wrapper of Puppeteer's page, for ease of use. Easily extendable.
   * @param {Page} page - Puppeteer page to work upon
   * @param {object} options - contains timeout used in waitForSelector and waitForFunction methods
   * @param {object} selectors - dictionary of useful selectors for elements on the page
   * @param {string} url - URL to go to
   */
  constructor (page, options = {}, selectors = {}, url = undefined) {
    this.page = page
    this.options = options
    this.selector = selectors
    this.url = url
    autoBind(this)
  }

  goto () {
    if (!this.url) {
      throw new ReferenceError(
        `${this.constructor.name} pageobject has no url assigned`
      )
    }
    return this.page.goto(this.url, this.options)
  }
}
