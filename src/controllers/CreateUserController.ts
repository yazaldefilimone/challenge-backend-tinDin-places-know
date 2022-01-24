import { Request, Response } from 'express';
import { CreateUserUseCase } from '@/use-cases/user/create-user-use-cases'


class CreateUserController{
  async  handle(request:Request, response:Response):Promise<Response>{
    const { email, name, password } = request.body

    const createUserUseCase = new CreateUserUseCase()
    
    const result = await createUserUseCase.execute({ email, name, password });

    if(result instanceof Error){
      return response.status(500).json(result.message)
    }

    return response.status(201).json(result)
  }
}

export { CreateUserController }
