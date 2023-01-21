import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './lib/routes';

const app = Fastify();

app.register(cors); // limita os acesso ao back
app.register(appRoutes)

app.listen({
  port: 3333,
}).then(() => console.log('HTTP Server running in port 3333'));