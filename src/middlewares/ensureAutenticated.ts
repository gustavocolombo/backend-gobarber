import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

export default function ensureAutenticated (
  request: Request, 
  response: Response, 
  next: NextFunction) :
  void{

    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new Error('Ausência de token JWT ')
    }

    const [,token] = authHeader.split(' ');
    
   try {
    const decoded = verify(token, auth.jwt.secret);

    console.log(decoded);
    return next();
   }catch (err){
     throw new Error('Token JWT inválido');
   }

}