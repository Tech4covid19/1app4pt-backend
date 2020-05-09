'use strict'

const fastify = require('fastify')({logger: false})
const path = require('path')
const AutoLoad = require('fastify-autoload')
// store application root
global.__basedir = __dirname

const dotEnv = require('dotenv').config()

/*
fastify.register(
  require('fastify-rate-limit'), {
  max: 60,
  timeWindow: '1 minute'
})
*/

fastify.register(
  require('fastify-helmet'), {
  hidePoweredBy: {
    setTo: '1app4pt API Server'
  }
})

const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // to support some legacy browsers
}
fastify.use(require('cors')(corsOptions))

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  //options: Object.assign({}, opts)
})

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'controllers/v1'),
  options: Object.assign({}, { prefix: '/api/v1' })
})

fastify.register(require('fastify-axios'))

// Support for AWS Lambda
if (process.env.AWS_EXECUTION_ENV) {
  const serverless = require('serverless-http');
  module.exports.handler = serverless(fastify);
} else {
  fastify.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`server listening on ${fastify.server.address().port}`);
  })
}



