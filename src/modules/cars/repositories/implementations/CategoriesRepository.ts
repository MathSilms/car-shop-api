import { Category } from '../../entities/Category';

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';

import { getRepository, Repository } from 'typeorm';

class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>

    constructor() {
        this.repository = getRepository(Category);
    }

    /**
     * Responsável por instânciar o repositório
     */
    
    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
  
        const category = this.repository.create({
            description,
            name,
        })
        // this.categories.push(category);
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.repository.findOne({ name });

        return category;
    }
}

export { CategoriesRepository };
