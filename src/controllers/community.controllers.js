import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;
    try {
      const post = await prisma.community.create({
        data,
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the post' });
    }
  });
  

router.get('/', async (req, res) => {
    try {
      const communityPosts = await prisma.community.findMany();
      res.json(communityPosts);
    } catch (error) {
      console.error('Error retrieving community posts:', error);
      res.status(500).json({ error: 'An error occurred while retrieving community posts' });
    }
  });
  

export default router;
