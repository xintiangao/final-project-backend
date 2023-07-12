import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const allIncomeInput = await prisma.incomeInput.findMany();
  res.json(allIncomeInput);
});

router.post('/', async (req, res) => {
  const data = req.body;
  console.log(data)
  const dateString = data.date
  data.date= new Date(dateString);

    try {
      const incomeInput = await prisma.incomeInput.create({
        data,
      });
  
      return res.json(incomeInput);
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
    const allIncomeInput = await prisma.incomeInput.deleteMany();
    res.json(allIncomeInput);
  });

router.get('/:userId', async (req, res) => {
  try {
    const expenseData = await prisma.incomeInput.findMany({
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
