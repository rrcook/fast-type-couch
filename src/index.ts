import fastify from 'fastify'
import * as http from 'http'
import couchConnector from './our-couch-connector'
import routes from './our-first-route'
// import * as config from 'config'
// This line works, above doesn't. Gotta love Typescript
import config = require("config");

// Require the framework and instantiate it
// const fastify = require('fastify')({
//     logger: true
//   })

const server: fastify.FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse> = fastify({ logger: true})

server.register(couchConnector, config.get('couchdb'))

server.register(routes, config.get('messages'))

const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()  
