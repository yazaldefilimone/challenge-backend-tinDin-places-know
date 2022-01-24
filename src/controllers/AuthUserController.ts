import { Request, Response } from 'express';
import { AuthUserUseCase } from '@/use-cases/user/auth-user-use-cases';
import { userDTO } from '../interfaces/dtos'

class AuthUserController{
  async  handle(request:Request, response:Response):Promise<Response>{
    const { email, password } = request.body as userDTO

    const authUserUseCase = new AuthUserUseCase()
    
    const result = await authUserUseCase.execute({ email, password });

    if(result instanceof Error){
      return response.status(500).json(result.message)
    }

    return response.status(201).json(result)
  }
}

export { AuthUserController }
