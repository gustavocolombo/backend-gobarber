import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'

interface Request {
  email: string;
  password: string;
}

interface Response{
  user: User;
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

    return {
      user
    }

  }
}

export default CreateSessionUserService;