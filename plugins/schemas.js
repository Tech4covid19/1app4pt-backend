'use strict'

const fp = require('fastify-plugin')

const schemas = {
    createEnrollment: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
            name: {
                type: 'string'
            },
            email: {
                type: 'string',
            },
           
            affiliation: {
                type: 'string'
            },
            newsletter: {
                type: 'boolean'
            }
        }
    },
   
};

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('schemas', () => {
        return schemas
    })
})
