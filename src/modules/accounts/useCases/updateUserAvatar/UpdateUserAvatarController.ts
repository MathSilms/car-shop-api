import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.user;
        const avatarFile = req.file.filename;

        // receber arquivo

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_ìd: id, avatarFile });

        return res.status(204).send();
    }
}

export { UpdateUserAvatarController }