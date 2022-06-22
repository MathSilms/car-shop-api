import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUSersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUSersRepository
    ) { };

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) throw new Error("User already exists!");

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password:passwordHash,
            driver_license,
        });


    }

}

export { CreateUserUseCase }