'use strict'

const tools = require('../../../tools/tools')
const aws = require('../../../services/aws-service');

module.exports = async (fastify, opts) => {

  fastify.post('/enrollment', {
    schema: {
      tags: ['enrollment'],
      body: fastify.schemas().createEnrollment
    }
  }, async (request, reply) => {

    try {

    const {name, email, affiliation, newsletter} = request.body
        
      if (!name || !email) {
        reply.status(400).send({error: "Name and email are mandatory!"});
      }
      else if (!validateEmail(email)) {
        reply.status(400).send({error: "Please provide a valid email address."});
      }
      else {

        // Send email
        await aws.SES.sendEnrollmentEmail(name, email, affiliation, newsletter);
        
        reply.send({status: 'ok'})
      }

    } catch (error) {
         
      request.log.error(error)

      reply.status(500).send(sanitize_log(error, 'It was not possible to enroll user.'));
    }
  })
}
