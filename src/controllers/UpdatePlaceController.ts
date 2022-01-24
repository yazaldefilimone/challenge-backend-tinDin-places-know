import { Request, Response } from 'express';
import { UpdatePlaceUseCase } from '@/use-cases/place/update-place-use-cases'


export class UpdatePlaceController{
  async  handle(request:Request, response:Response):Promise<Response>{
    try{
      const { name } = request.body
      const { id } = request.params

      const updatePlaceUseCase = new UpdatePlaceUseCase()
    
      const result = await updatePlaceUseCase.execute(id, { name ,place:''});
  
      if(result instanceof Error){
        return response.status(500).json(result.message)
      }

      return response.status(201).json(result)
    } catch(erro){
        return response.status(500).json({error:'server time out'})
      }
  }
}

