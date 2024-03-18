class Util {
  async timeout(interval = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, interval)
    })
  }
}

module.exports = Util
