import { Request, Response } from 'express';
import { CreatePlaceUseCase } from '@/use-cases/place/create-place-use-cases'


class CreatePlaceController{
  async  handle(request:Request, response:Response):Promise<Response>{
    const { name } = request.body

    const createPlaceUseCase = new CreatePlaceUseCase()
    
    const result = await createPlaceUseCase.execute({ name ,place:''});

    if(result instanceof Error){
      return response.status(500).json(result.message)
    }

    return response.status(201).json(result)
  }
}

export { CreatePlaceController }
