import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const bankInput = await prisma.bank.findMany();
  res.json(bankInput);
});

router.post('/', async (req, res) => {
  const data = req.body;

    try {
      const bankInput = await prisma.bank.create({
        data,
      });
  
      return res.json(bankInput);
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
    const bankId = req.params.id;
  
    try {
      const deletedCashBack = await prisma.cashBack.delete({
        where: { id: parseInt(bankId) },
      });
  
      res.sendStatus(200); 
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return res.status(404).send({
          error: 'bank input not found',
        });
      }
      console.error('Failed to delete bank:', err);
      res.sendStatus(500);
    }
  });

  router.delete('/', async (req, res) => {
    const allBankPosts = await prisma.bank.deleteMany();
    res.json(allBankPosts);
  });

router.patch('/:id', async (req, res) => {
  const id = req.body.id;
  const data = req.body;

  try {
    const bankInput = await prisma.bank.update({
      where: { id: parseInt(id) },
      data,
    });

    return res.json(bankInput);
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
    const bankInput = await prisma.bank.findMany({
      where: {
        userId: parseInt(req.params.userId),
      },
    });
    res.json(bankInput)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts'})
  }
})

export default router;
