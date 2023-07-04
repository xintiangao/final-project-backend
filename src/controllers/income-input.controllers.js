import express from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

router.post('/', async (req, res) => {
  const data = req.body;

//   const validationErrors = validateUser(data);

//   if (Object.keys(validationErrors).length !== 0)
//     return res.status(400).send({
//       error: validationErrors,
//     });

  try {
    const user = await prisma.user.create({
      data,
    });

    return res.json(filter(user, 'id', 'name', 'email'));
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

export default router;