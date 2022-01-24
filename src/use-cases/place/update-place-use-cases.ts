
import { placeDTO } from "../../interfaces/dtos"
import { PlaceRepository } from "../../repositories/PlaceRepository";
import { getCustomRepository } from 'typeorm'
import axios from "axios";
import { LoadPhotosOfUnsplash } from "../services/unsplash/LoadPhotosOfUnsplash"
import { Place } from '../../entities/Place'


export class UpdatePlaceUseCase{
  async execute(id:string ,{ name, place }: placeDTO): Promise<Error | Place>{
    const repository = getCustomRepository(PlaceRepository);

    if(!name){
      return new Error(`missing params name`);
    }
    const isExists = await repository.findOne({ id });

    if(!isExists){
      return new Error(`place not found`);
    }

    const loadPhotosOfUnsplash= new LoadPhotosOfUnsplash(axios)
    
    const result = await loadPhotosOfUnsplash.load({page:1, search:name, pageIndex:2});

    if(result.status == 'OK'){
      place = result.imge1 ? result.imge1 : result.imge2;
    } else {
      return new Error('internal server error')
    }

    isExists.name = name;
    isExists.place = place;
  
    await repository.save(isExists);

    return isExists

  }
}
