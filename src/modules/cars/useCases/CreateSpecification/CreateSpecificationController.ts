import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
    constructor(
        private createSpecificationUseCase: CreateSpecificationUseCase,
    ) {}

    handle(req: Request, res: Response): Response {
        const { name, description } = req.body;
        const allCategories = this.createSpecificationUseCase.execute({
            name,
            description,
        });

        return res.status(200).json(allCategories);
    }
}

export { CreateSpecificationController };
