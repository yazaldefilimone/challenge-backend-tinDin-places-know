import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@/repositories/UserRepository';
import { userDTO } from '@/interfaces/dtos'
import { compareValue, createJWT } from '@/shared/security';

type Token = {
  user:{
    name:string;
    email:string;  
  },
  token: string
}
export class AuthUserUseCase{
  async execute({ email, password }:userDTO):Promise<Token | Error>{
    const repository = getCustomRepository(UserRepository);

    if(!email || !password ){
      const notExists = email ? 'password' :  'email' ;
      return new Error(`missing params ${notExists}`);
    }

    
    const isExists = await repository.findOne({ email });

    if(!isExists){
      return new Error('user is not found');
    }

    if(!await compareValue(password, isExists.password)){
      return new Error('faild password');
    }

    const token = createJWT({ id: isExists.id })

    const user:Token = {
      user:{
        name:isExists.name,
        email:isExists.email
      },
      token
    }


    return user
  }
}
