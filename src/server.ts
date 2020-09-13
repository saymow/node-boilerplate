import express from 'express';

import routes from './routes';

const app = express();

app.use(routes);

app.get('/', (req, res) => res.send('Hello world'));

app.listen(3333, () => console.log('Server on'));
