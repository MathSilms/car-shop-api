import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

// import { createSpecificationController } from '../modules/cars/useCases/CreateSpecification';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const createSpecificationController = new CreateSpecificationController();

const specificationRoutes = Router();

specificationRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationRoutes };
