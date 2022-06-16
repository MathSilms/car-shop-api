import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

   async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
      
        if (categoryAlreadyExists) throw new Error(' Category already exists!');

        // return res.status(400).json({ error: 'Category already exists' });

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
