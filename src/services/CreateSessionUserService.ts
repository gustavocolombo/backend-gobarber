import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import auth from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response{
  user: User;
  token: string;
}

class CreateSessionUserService {
  public async execute({ email, password }: Request): Promise <Response>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where : { email }
    });


    if(!user){
      throw new Error ('Combinação de senha e e-mail incorreta');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new Error ('Combinação de senha e e-mail incorreta');
    } 

    const token = sign({}, auth.jwt.secret , {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn
    })

    return {
      user,
      token
    }

  }
}

export default CreateSessionUserService;