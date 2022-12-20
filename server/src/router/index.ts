

const authRouter = require('./authRoutes')
const vaccineRoutes = require('./vaccinesRoutes')
const express = require('express')


module.exports = () => {
  const Router = express.Router()
  authRouter(Router)
  vaccineRoutes(Router)
  return Router
}