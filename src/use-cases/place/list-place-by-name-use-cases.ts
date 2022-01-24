
import { PlaceRepository } from "../../repositories/PlaceRepository";
import { getCustomRepository } from 'typeorm'
import { Place } from '../../entities/Place'


export class ListPlaceByNameUseCase{
  async execute(name:string): Promise<Error | Place | any>{
    const repository = getCustomRepository(PlaceRepository);

    if(!name){
      return new Error(`missing params name`);
    }
    const isExists = await repository.findOne({ name });

    if(!isExists){
      return new Error(`place  no  found`);
    }


    return isExists;

  }
}
