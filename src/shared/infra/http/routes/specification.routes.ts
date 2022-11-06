import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

// import { createSpecificationController } from '../modules/cars/useCases/CreateSpecification';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const createSpecificationController = new CreateSpecificationController();

const specificationRoutes = Router();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
