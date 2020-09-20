import { getRepository } from 'typeorm';

import Post from '../models/Post';

interface Request {
  author_id: string;
  title: string;
  body: string;
}

class CreatePostService {
  public async execute({ author_id, title, body }: Request): Promise<Post> {
    const postsRepository = getRepository(Post);

    const post = postsRepository.create({
      author_id,
      title,
      body,
    });

    await postsRepository.save(post);

    return post;
  }
}

export default CreatePostService;
