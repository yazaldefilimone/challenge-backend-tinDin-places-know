import { Request, Response } from 'express';
import { ListAllPlaceUseCase } from "@/use-cases/place/list-all-place-use-cases"

import { serializePagination } from "../shared/utils"

export class ListAllPlaceController{
  async  handle(request:Request, response:Response):Promise<Response>{
    try{
      const { page, limit } = request.query;
      const limitInt = Number(limit);
      const pageInt = Number(page);
      const pagination = serializePagination({ page:pageInt, limit:limitInt });

      
      const listAllPlaceUseCase = new ListAllPlaceUseCase()
      const result = await listAllPlaceUseCase.execute();
      if(result instanceof Error){
        return response.status(500).json(result.message)
      }

  
      return response.status(201).json(result.slice(pagination.page, pagination.limit))
    }catch(err){
      return response.status(500).json({ error:'server time out' })
    }
    
  }
}

