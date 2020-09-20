import { Router } from 'express';

import usersRouter from './user.routes';
import postsRouter from './post.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);

export default routes;
