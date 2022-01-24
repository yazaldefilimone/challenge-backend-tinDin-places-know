import { Repository, EntityRepository } from 'typeorm';
import { Place } from '../entities/Place';

@EntityRepository(Place)
class PlaceRepository extends Repository<Place>{
  
}

export { PlaceRepository }
