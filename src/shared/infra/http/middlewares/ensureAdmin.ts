import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { AppError } from "@shared/errors/appError";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(
    req:Request,
    res:Response,
    next:NextFunction
    
) {

    
const { id } = req.user;

const usersRepository = new UsersRepository();

console.log("-----------")
    console.log("usersRepository:",usersRepository)
    console.log("-----------")

const user = await usersRepository.findById(id);

console.log("-----------")
console.log("user:",user)
console.log("-----------")

if(!user.isAdmin) throw new AppError("User isn't admin!")

return next();

}