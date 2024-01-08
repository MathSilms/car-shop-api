import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/appError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError('Token missing', 401);

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            '35b1b8a2ce08f1d98cacab9f7976b832',
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if (!user) throw new AppError('User does not Exists!', 401);

        req.user = {
            id: user_id,
        };

        next();
    } catch (err) {
        throw new AppError('Invalid token!', 401);
    }
}
