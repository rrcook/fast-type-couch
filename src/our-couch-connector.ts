import fastify from 'fastify'
import Nano  from 'nano'
import fastifyPlugin from 'fastify-plugin'

async function couchConnector (fastify: fastify.FastifyInstance, options: { [key: string]: any; }) {
    const url = options.url
  
    let n = Nano(url)
    let patients = n.db.use('patients')

    fastify.decorate('couch', patients)
  }
  
// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
export default fastifyPlugin(couchConnector)
