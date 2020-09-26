import { Router } from 'express';

import usersRouter from './user.routes';
import postsRouter from './post.routes';
import sessionRoutes from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRoutes);
routes.use('/posts', postsRouter);

export default routes;
