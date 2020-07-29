import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import routes from './routes/index';
import './database';
import path from 'path';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))); 

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(3333, () => {
  console.log('Backend started');
});
