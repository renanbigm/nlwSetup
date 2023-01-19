import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors); // limita os acesso ao back

app.get('/', async () => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'beber',
      }
    }
  })

  return habits;
});

app.listen({
  port: 3333,
}).then(() => console.log('HTTP Server running in port 3333'));