import { Router } from 'express';
import { getRepository } from 'typeorm';

import Post from '../models/Post';
import CreatePostService from '../service/createPostService';

const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
  try {
    const postsRepository = getRepository(Post);

    const posts = await postsRepository.find();

    return res.send(posts);
  } catch (err) {
    return res.status(400).send({ err: err.message });
  }
});

postsRouter.post('/', async (req, res) => {
  try {
    const { author_id, title, body } = req.body;

    const createPost = new CreatePostService();

    const post = await createPost.execute({
      author_id,
      title,
      body,
    });

    return res.send(post);
  } catch (err) {
    return res.status(400).send({ err: err.message });
  }
});

export default postsRouter;
