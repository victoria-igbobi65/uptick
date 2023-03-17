const treblle = require('@treblle/express')
const CONFIG = require('../../config/config')

module.exports = treblle({
    apiKey: CONFIG.TREBLLE_KEY,
    projectId: CONFIG.TREBLLE_PROJECT_ID
})