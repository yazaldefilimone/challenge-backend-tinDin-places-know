import { env } from "../../../config/env"
import { LoadPhotosOfUnsplashDTO, response } from './LoadPhotosOfUnsplashDTO'
import { AxiosResponse, AxiosStatic } from 'axios';



export class LoadPhotosOfUnsplash {
  public request : AxiosStatic
  constructor(request:AxiosStatic){
    this.request = request;
  }

  async load({ page, search, pageIndex }:LoadPhotosOfUnsplashDTO):Promise<response>{
    const api_url = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&per_page=${pageIndex}&client_id=${env.unsplash}`

    const result = await this.request.get<response>(api_url) as any
      const imge1 = result.data.results[0].urls.full as string
      const imge2 = result.data.results[0].urls.regular as string
      return {
        status:result.statusText,
        imge2,
        imge1
      }
      
    }
}


