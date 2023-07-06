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
  const dateString = data.date
  data.date= new Date(dateString);
  
//   const validationErrors = validateUser(data);

//   if (Object.keys(validationErrors).length !== 0)
//     return res.status(400).send({
//       error: validationErrors,
//     });

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

export default router;
