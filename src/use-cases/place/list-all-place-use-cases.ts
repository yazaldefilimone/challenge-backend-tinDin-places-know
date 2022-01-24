
import { PlaceRepository } from "../../repositories/PlaceRepository";
import { getCustomRepository } from 'typeorm'
import { Place } from '../../entities/Place'


export class ListAllPlaceUseCase{
  async execute(): Promise<Place[]>{
      const repository = getCustomRepository(PlaceRepository);

      const Places = await repository.find();

      return Places
  }
}

