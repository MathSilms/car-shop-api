import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
    user_ìd: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository:IUsersRepository
    ){}

    async execute({ avatarFile, user_ìd }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_ìd);
        
        user.avatar = avatarFile;

        await this.userRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase }