import * as fastify from 'fastify'
import * as http from 'http'
import {MangoQuery} from 'nano'
import {getRecordFromId, getRecordsFromState} from './couchdb-service'
// our-first-route.js


async function routes(fastify: fastify.FastifyInstance, options: { [key: string]: any; }) {
    
    const couchDB = fastify.couch

    fastify.get('/', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        return { hello: 'world' }
    })

    fastify.get('/route', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        return { hello: options.message }
    })

    fastify.get('/couch/:id', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        console.log("id = " + request.params.id)
        const oid = request.params.id
        console.log("Made it past oid creation")
        const result = getRecordFromId(couchDB, oid)
        if (result === null) {
            throw new Error('Invalid value')
        }
        return result
    })

    fastify.get('/state/:id', async (request: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) => {
        console.log("id = " + request.params.id)
        const oid = request.params.id
        console.log("Made it past oid creation")
        const result = getRecordsFromState(couchDB, oid)
        if (result === null) {
            throw new Error('Invalid value')
        }
        return result
    })
}

export default routes  