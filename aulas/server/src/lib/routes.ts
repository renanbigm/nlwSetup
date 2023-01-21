import dayjs from 'dayjs';
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      ),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf('day').toDate();
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays : {
          create: weekDays.map((day) => ({ week_day: day }))
        }
      }
    });
  });

  app.get('/day', async (request) => {
    const getDayParams = z.object({ date: z.coerce.date() }); // converte a string q vem como parametro em um objeto de new Date()

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          }
        }
      }
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    });

    const completedHabits = day?.dayHabits.map((day) => day.habit_id);

    return {
      possibleHabits,
      completedHabits
    };
  });

  

}

