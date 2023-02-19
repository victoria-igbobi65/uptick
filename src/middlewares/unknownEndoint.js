const { StatusCodes } = require("http-status-codes")
const { AppError } = require("../errors/AppError")

module.exports = (req, res) => {
    throw new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND)
}
