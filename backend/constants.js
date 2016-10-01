if (process.env.NODE_ENV === 'production') {
  module.exports = require('./constants.production'); // eslint-disable-line global-require
} else {
  module.exports = require('./constants.development'); // eslint-disable-line global-require
}
