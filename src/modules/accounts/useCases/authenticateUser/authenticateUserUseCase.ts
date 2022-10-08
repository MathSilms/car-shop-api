import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/appError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError("Email or password incorrect");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new AppError("Email or password incorrect");

        const token = sign({}, "35b1b8a2ce08f1d98cacab9f7976b832", {
            subject: user.id,
            expiresIn: "1d"
        });

        return {
            user,
            token,
        }

    }
}

export { AuthenticateUserUseCase }