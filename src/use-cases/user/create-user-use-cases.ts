import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@/repositories/UserRepository';
import { User } from '@/entities/User';
import { hashValue } from '../../shared/security';
import { userDTO } from '@/interfaces/dtos'

type Users = {
  id:string;
  name:string;
  email:string;
  created_at:Date;
}

export class CreateUserUseCase{
  async execute({ email, name, password }:userDTO):Promise<Users | Error>{
    const repository = getCustomRepository(UserRepository);

    if(!email || !password ){
      const notExists = email ? 'password' :  'email' ;
      return new Error(`missing params ${notExists}`);
    }

    if(!name) return new Error(`missing params name`);
    
    const isExists = await repository.findOne({ email });

    if(isExists){
      return new Error('user already exists');
    }

    const passwordHash = await hashValue(password)
    
    const user = repository.create({ name, email, password: passwordHash });

    await repository.save(user);

    return {
      id:user.id,
      name:user.name,
      email:user.email,
      created_at:user.created_at
    }
  }
}
