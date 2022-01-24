import { Request, Response } from 'express';
import { ListPlaceByNameUseCase } from '@/use-cases/place/list-place-by-name-use-cases'


export class ListPlaceByNameController{
  async  handle(request:Request, response:Response):Promise<Response>{
    const { name } = request.params

    const list = new ListPlaceByNameUseCase()
    
    const result = await list.execute(name);

    if(result instanceof Error){
      return response.status(500).json(result.message)
    }

    return response.status(201).json(result)
  }
}

