import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategoryUserCase: CreateCategoryUseCase) {}

    handle(req: Request, res: Response): Response {
        const { name, description } = req.body;

        this.createCategoryUserCase.execute({ name, description });

        return res.status(201).send();
    }
}

export { CreateCategoryController };
