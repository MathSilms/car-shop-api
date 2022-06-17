import { Router } from 'express';

// import { createSpecificationController } from '../modules/cars/useCases/CreateSpecification';
import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationController';

const createSpecificationController = new CreateSpecificationController();

const specificationRoutes = Router();

specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
