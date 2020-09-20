import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const app = express();
const PORT = 3333 || process.env.PORT;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log('Server on, port', PORT));
