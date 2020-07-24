import  { Router } from 'express';
import CreateSessionUserService from '../services/CreateSessionUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async  (request, response) => {
 try{
  const { email, password } = request.body;
  const authenticateUser = new CreateSessionUserService();

  const { user } = await authenticateUser.execute({
    email,
    password
  })

  return response.json({user});

 }catch(err){
   return response.status(400).json({ error: err.message});
 }
});

export default sessionsRouter;