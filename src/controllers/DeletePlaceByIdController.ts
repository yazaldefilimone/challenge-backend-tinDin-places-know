import { Request, Response } from 'express';
import { DeletePlaceByIdUseCase } from '@/use-cases/place/delete--place-by-name-use-cases'


export class DeletePlaceByIdController{
  async  handle(request:Request, response:Response):Promise<Response>{
    const { id } = request.params

    const deletePlaceByIdUseCase = new DeletePlaceByIdUseCase()
    
    const result = await deletePlaceByIdUseCase.execute(id);

    if(result instanceof Error){
      return response.status(500).json(result.message)
    }

    return response.status(200).send()
  }
}

