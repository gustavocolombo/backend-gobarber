import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload{
  iat: number;
  exp:number;
  sub: string;
}

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

    const { sub } = decoded as TokenPayload;

    request.user = {
      id:sub
    }
    return next();
   }catch (err){
     throw new Error('Token JWT inválido');
   }

}