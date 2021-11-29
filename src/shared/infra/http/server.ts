import 'reflect-metadata';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import uploadConfig from '../../../config/upload';

import '../typeorm'
import '../../container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

process.env.APP_API_URL = 'http://localhost:3333';

app.listen(3333, () => {
  console.log('Server startado na porta 3333');
});
