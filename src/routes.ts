import { Router } from 'express';
import { authUserJwtMiddleware } from './middlewares/auth-middlewares'
//Users
import { CreateUserController } from '@/controllers/CreateUserController'
import { AuthUserController } from '@/controllers/AuthUserController'


import { CreatePlaceController } from '@/controllers/CreatePlaceController'
import { ListAllPlaceController } from './controllers/ListAllPlaceController'
import { DeletePlaceByIdController } from './controllers/DeletePlaceByIdController'
import { ListPlaceByNameController } from "./controllers/ListPlaceByNameController"

import { UpdatePlaceController } from "./controllers/UpdatePlaceController"

const routes = Router();

routes.post('/users', new CreateUserController().handle);
routes.post('/users/login', new AuthUserController().handle);


routes.post('/place', authUserJwtMiddleware, new CreatePlaceController().handle)
routes.delete('/place/:id',authUserJwtMiddleware, new DeletePlaceByIdController().handle)
routes.get('/place',authUserJwtMiddleware, new ListAllPlaceController().handle)
routes.get('/place/:name',authUserJwtMiddleware, new ListPlaceByNameController().handle)
routes.put('/place/:id',authUserJwtMiddleware, new UpdatePlaceController().handle)
export { routes }
