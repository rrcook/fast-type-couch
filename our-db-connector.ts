import fastify from 'fastify'
import { MongoClient} from 'mongodb'
const fastifyPlugin = require('fastify-plugin')
// const MongoClient = require('mongodb').MongoClient

async function dbConnector (fastify: fastify.FastifyInstance, options: { [key: string]: any; }) {
  const url = options.url

  const db = await MongoClient.connect(url, options)
  fastify.decorate('mongo', db)
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)
