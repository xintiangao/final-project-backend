import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const allexpenseInput = await prisma.expenseInput.findMany();
  res.json(allexpenseInput);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const dateString = data.date
  data.date= new Date(dateString);

  // const validationErrors = validateUser(data);

  // if (Object.keys(validationErrors).length !== 0)
  //   return res.status(400).send({
  //     error: validationErrors,
  //   });

    try {
      const expenseInput = await prisma.expenseInput.create({
        data,
      });
  
      return res.json(expenseInput);
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

  router.delete('/:id', async (req, res) => {
    const expenseId = req.params.id;
  
    try {
      const deletedExpense = await prisma.expenseInput.delete({
        where: { id: parseInt(expenseId) },
      });
  
      res.sendStatus(200); // Send a success status code
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return res.status(404).send({
          error: 'Expense input not found',
        });
      }
      console.error('Failed to delete expense:', err);
      res.sendStatus(500); // Send an error status code
    }
  });
  

router.patch('/:id', async (req, res) => {
  const id = req.body.id;
  const data = req.body;

  try {
    const expenseInput = await prisma.expenseInput.update({
      where: { id: parseInt(id) },
      data,
    });

    return res.json(expenseInput);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      return res.status(404).send({
        error: 'Expense input not found',
      });
    }
    throw err;
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const expenseData = await prisma.expenseInput.findMany({
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
