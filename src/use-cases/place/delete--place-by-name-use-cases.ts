
import { PlaceRepository } from "../../repositories/PlaceRepository";
import { getCustomRepository } from 'typeorm'

export class DeletePlaceByIdUseCase{
  async execute(id:string): Promise<Error | void>{
    const repository = getCustomRepository(PlaceRepository);

    if(!id){
      return new Error(`missing params id`);
    }
    const isExists = await repository.findOne(id);

    if(!isExists){
      return new Error(`place  nof found`);
    }

    await repository.delete(isExists)
  }
}
