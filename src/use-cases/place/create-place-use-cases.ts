
import { placeDTO } from "../../interfaces/dtos"
import { PlaceRepository } from "../../repositories/PlaceRepository";
import { getCustomRepository } from 'typeorm'
import axios from "axios";
import { LoadPhotosOfUnsplash } from "../services/unsplash/LoadPhotosOfUnsplash"
import { Place } from '../../entities/Place'


export class CreatePlaceUseCase{
  async execute({ name, place }: placeDTO): Promise<Error | Place>{
    const repository = getCustomRepository(PlaceRepository);

    if(!name){
      return new Error(`missing params name`);
    }
    const isExists = await repository.findOne({ name });

    if(isExists){
      return new Error(`place  already  exists`);
    }

    const loadPhotosOfUnsplash= new LoadPhotosOfUnsplash(axios)
    
    const result = await loadPhotosOfUnsplash.load({page:1, search:name, pageIndex:2});

    if(result.status == 'OK'){
      place = result.imge1 ? result.imge1 : result.imge2;
    } else {
      return new Error('internal server error')
    }
  
    const  Place = repository.create({ name, place });
    await repository.save(Place);

    return Place

  }
}
