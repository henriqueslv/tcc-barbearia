import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import routes from './routes';

import '../typeorm'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server startado na porta 3333');
});
