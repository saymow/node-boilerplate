import { Router } from 'express';

import usersRouter from './users.routes';
import postsRouter from './posts.routes';
import sessionRoutes from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRoutes);
routes.use('/posts', postsRouter);

export default routes;
