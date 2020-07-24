import User from '../models/User';
import { getRepository } from 'typeorm';

interface Request{
  name : string;
  email: string;
  password: string;
}

class CreateUserService{
  public async execute({name, email, password}: Request) : Promise<User>{
    const usersRepository = getRepository(User);

    const userCheckExists = await usersRepository.findOne({
      where: { email }
    });

    if(userCheckExists){
      throw new Error('Endereço de e-mail já cadastrado no sistema!');
    }5

    const user = usersRepository.create({
      name,
      email,
      password
    });

    await usersRepository.save(user);

  return user;  
  }
}

export default CreateUserService;