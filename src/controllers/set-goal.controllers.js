import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const allGoals = await prisma.setGoal.findMany();
  res.json(allGoals);
});

router.post('/', auth, async (req, res) => {
  const data = req.body;
  const user_id = req.user.payload.id
  // const startDateString = data.start_date
  // const endDateString = data.end_date
  // data.start_date = new Date(startDateString);
  // data.end_date = new Date(endDateString);

//   const validationErrors = validateUser(data);

//   if (Object.keys(validationErrors).length !== 0)
//     return res.status(400).send({
//       error: validationErrors,
//     });

  try {
    const goal = await prisma.setGoal.create({
      data: {
        ...data,
        expenseCategories:{
          create: data.expenseCategories,
        },
        user: {
          connect: {
                    id : user_id
                },
        }
      }
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

router.get('/:userId', async (req, res) => {
  try {
    const expenseData = await prisma.setGoal.findUnique({
      where: {
        userId: parseInt(req.params.userId),
      },
    });
    res.json(expenseData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts'})
  }
})

export default router;
