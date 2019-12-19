import * as fastify from "fastify"
import * as http from "http"
import Nano from 'nano'

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
    > {
    couch: Nano.DocumentScope<unknown>
  }
}
