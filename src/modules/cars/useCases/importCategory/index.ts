import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCate';

const importCategoryUseCase = new ImportCategoryUseCase();
const importCategoryController = new ImportCategoryController(
    importCategoryUseCase,
);

export { importCategoryController };
