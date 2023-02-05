import upload from "@config/upload";
import { Request, Response } from "express"
import { container } from "tsyringe"
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase"

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const uploadCarsImageUseCase = container.resolve(UploadCarImagesUseCase);
        const { id } = req.params;
        const images = req.files as IFiles[];

        const images_name = images.map((file) => file.filename)

        await uploadCarsImageUseCase.execute({
            car_id: id,
            images_name
        });

        return res.status(201).send();
    }
}

export { UploadCarImagesController }