import Fastify from "fastify";

const app = Fastify();

app.get('/', () => 'Hello Word');

app.listen({
  port: 3333,
}).then(() => console.log('HTTP Server running in port 3333'));