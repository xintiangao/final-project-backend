import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const cashBackInput = await prisma.cashBack.findMany();
  res.json(cashBackInput);
});

router.post('/', async (req, res) => {
  const data = req.body;

    try {
      const cashBackInput = await prisma.cashBack.create({
        data,
      });
  
      return res.json(cashBackInput);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        const formattedError = {};
        formattedError[`${err.meta.target[0]}`] = 'error';
  
        return res.status(500).send({
          error: formattedError,
        });
      }
      throw err;
    }
  });

  router.delete('/:id', async (req, res) => {
    const cashBackId = req.params.id;
  
    try {
      const deletedCashBack = await prisma.cashBack.delete({
        where: { id: parseInt(cashBackId) },
      });
  
      res.sendStatus(200); // Send a success status code
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return res.status(404).send({
          error: 'cashBack input not found',
        });
      }
      console.error('Failed to delete cashBack:', err);
      res.sendStatus(500); // Send an error status code
    }
  });
  
  router.delete('/', async (req, res) => {
    const allCashBack = await prisma.cashBack.deleteMany();
    res.json(allCashBack);
  });

router.patch('/:id', async (req, res) => {
  const id = req.body.id;
  const data = req.body;

  try {
    const cashBackInput = await prisma.cashBack.update({
      where: { id: parseInt(id) },
      data,
    });

    return res.json(cashBackInput);
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
    const cashBackInput = await prisma.cashBack.findMany({
      where: {
        userId: parseInt(req.params.userId),
      },
    });
    res.json(cashBackInput)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts'})
  }
})

export default router;
