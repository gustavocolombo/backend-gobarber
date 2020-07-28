import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';
import './database';
import path from 'path';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.listen(3333, () => {
  console.log('Backend started');
});
