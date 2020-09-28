import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      status: 'Error',
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).send({
    status: 'Error',
    message: 'Internal server error.',
  });
});

app.listen(PORT, () => console.log('Server on, port', PORT));
