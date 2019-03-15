jest.setTimeout(10000) // 10 sec global timeout

page.on('pageerror', err => console.warn('pageerror: ', err))
