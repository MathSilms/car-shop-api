import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCate';

export default ():ImportCategoryController => {
    const categoriesRepository = new CategoriesRepository();
    const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
    const importCategoryController = new ImportCategoryController(
        importCategoryUseCase,
    );

    return importCategoryController;
}
