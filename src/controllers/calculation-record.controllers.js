import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userId = req.user.payload.id
  const allCalculationRecords = await prisma.calculationRecord.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      expenseCategories: true,
    },
  });
  res.json(allCalculationRecords);
});

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const record = await prisma.calculationRecord.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      expenseCategories: true,
    },
  });
  res.json(record);
});

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  await prisma.expensesCategoryForCalculationRecord.deleteMany({
    where: {
      CalculationRecordId: Number(id),
    },
  });
  const record = await prisma.calculationRecord.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(record);
});

router.post('/', auth, async (req, res) => {
  const data = req.body;
  const userId = req.user.payload.id
//   const dateString = data.date
//   const dateValue = new Date(dateString);
//   const isoDate = dateValue.toISOString()
//   data.date=isoDate
  
//   const validationErrors = validateUser(data);

//   if (Object.keys(validationErrors).length !== 0)
//     return res.status(400).send({
//       error: validationErrors,
//     });

  try {
    const calculationRecord = await prisma.calculationRecord.create({
      data: {
        ...data,
        expenseCategories:{
          create: data.expenseCategories,
        },
        user: {
          connect: {
                    id : userId
                },
        }
      }
    });

    return res.json(calculationRecord);
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
    const allCalculationRecords = await prisma.incomeInput.deleteMany();
    res.json(allCalculationRecords);
  });

export default router;
