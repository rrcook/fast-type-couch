import * as fastify from 'fastify'
import { createReadStream } from 'fs'
import * as http from 'http'
import { ObjectID } from 'mongodb'
// our-first-route.js


async function routes(fastify: fastify.FastifyInstance, options: { [key: string]: any; }) {
    const database = fastify.mongo.db('addressmatcher')
    const collection = database.collection('locations')
    
    const couchDB = fastify.couch

    fastify.get('/', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        return { hello: 'world' }
    })

    fastify.get('/route', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        return { hello: options.message }
    })

    fastify.get('/search/:id', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        console.log("id = " + request.params.id)
        const oid = ObjectID.createFromHexString(request.params.id)
        console.log("Made it past oid creation")
        const result = await collection.findOne({_id: oid})
        // const result = await collection.findOne()
        if (result === null) {
            throw new Error('Invalid value')
        }
        return result
    })

    fastify.get('/couch/:id', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        console.log("id = " + request.params.id)
        const oid = request.params.id
        console.log("Made it past oid creation")
        const result = await couchDB.get(oid)
        // const result = await collection.findOne()
        if (result === null) {
            throw new Error('Invalid value')
        }
        return result
    })
}

module.exports = routes  