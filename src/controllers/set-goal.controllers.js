import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const allGoals = await prisma.setGoal.findMany();
  res.json(allGoals);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const dateString = data.date
  const dateValue = new Date(dateString);
  const isoDate = dateValue.toISOString()
  data.date=isoDate
  
//   const validationErrors = validateUser(data);

//   if (Object.keys(validationErrors).length !== 0)
//     return res.status(400).send({
//       error: validationErrors,
//     });

  try {
    const goal = await prisma.setGoal.create({
      data,
    });

    return res.json(goal);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      const formattedError = {};
      formattedError[`${err.meta.target[0]}`] = 'already taken';

      return res.status(500).send({
        error: formattedError,
      });
    }
    throw err;
  }
});

router.delete('/', async (req, res) => {
    const allGoals = await prisma.setGoal.deleteMany();
    res.json(allGoals);
  });

export default router;
