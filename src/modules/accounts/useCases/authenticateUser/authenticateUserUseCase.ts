import { inject } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

import { IUSersRepository } from "../../repositories/IUsersRepository";

interface IRequest{

    email:string;
    password:string;
}

interface IResponse{
    user:{
        name:string,
        email:string
    };

    token:string;
}

class AuthenticateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository:IUSersRepository
    ){}

   async execute({email, password}:IRequest):Promise<IResponse>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user) throw new Error("Email or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) throw new Error("Email or password incorrect");

    const token = sign({},"35b1b8a2ce08f1d98cacab9f7976b832",{
        subject:user.id,
        expiresIn:"1d"
    });

    return {
        user,
        token,
    }

   }
}

export { AuthenticateUserUseCase }