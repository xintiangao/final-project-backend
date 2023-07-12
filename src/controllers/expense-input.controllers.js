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
  const dateValue = new Date(dateString);
  const isoDate = dateValue.toISOString()
  data.date=isoDate

  // const validationErrors = validateUser(data);

  // if (Object.keys(validationErrors).length !== 0)
  //   return res.status(400).send({
  //     error: validationErrors,
  //   });

    try {
      const expenseInput = await prisma.expenseInput.create({
        data,
      });

      console.log(data)
  
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

  router.delete('/', async (req, res) => {
    const allexpenseInput = await prisma.expenseInput.deleteMany();
    res.json(allexpenseInput);
  });

export default router;
