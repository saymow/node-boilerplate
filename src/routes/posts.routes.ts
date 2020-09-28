import { Router } from 'express';
import { getRepository } from 'typeorm';

import authenticate from '../middlewares/auth';
import Post from '../models/Post';
import CreatePostService from '../service/CreatePostService';

const postsRouter = Router();

postsRouter.use(authenticate);

postsRouter.get('/', async (req, res) => {
  const { id } = req.user;

  const postsRepository = getRepository(Post);

  const posts = await postsRepository.find({ where: { id } });

  return res.send(posts);
});

postsRouter.post('/', async (req, res) => {
  const { author_id, title, body } = req.body;

  const createPost = new CreatePostService();

  const post = await createPost.execute({
    author_id,
    title,
    body,
  });

  return res.send(post);
});

export default postsRouter;
