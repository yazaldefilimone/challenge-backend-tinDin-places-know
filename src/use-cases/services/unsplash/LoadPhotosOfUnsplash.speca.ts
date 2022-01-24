import axios from 'axios';
import { LoadPhotosOfUnsplash } from './LoadPhotosOfUnsplash';
import { LoadPhotosOfUnsplashDTO } from './LoadPhotosOfUnsplashDTO';


//jest.mock('axios');

describe("LoadPhotosOfUnsplash", () => {
  test('eu espero que o axios retorne a responsta com os dados que quero', async () => {
    
    const loadPhotosOfUnsplash = new LoadPhotosOfUnsplash(axios);
    const dto:LoadPhotosOfUnsplashDTO = {
      page:1,
      search:'woman',
      pageIndex:2
    }
    const result = await loadPhotosOfUnsplash.load(dto);

    expect(result.status).toBe('OK')
  })
})
