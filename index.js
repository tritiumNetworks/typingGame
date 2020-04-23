module.exports = { _root: '/type', _socket: false, _cors: true, _parser: [], ready, static: '/src' }

const path = require('path').resolve()
const { readFileSync } = require('fs')

function ready (app) {
  app.get('/', (_req, res) => res.send(readFileSync(path + '/router/type/page/index.html').toString('utf-8')))
}
