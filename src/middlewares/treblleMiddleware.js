const CONFIG = require('../../config/config')

const tMiddleware = {

    apiKey: CONFIG.TREBLLE_KEY,
    projectId: CONFIG.TREBLLE_PROJECT_ID
}

module.exports = { tMiddleware }