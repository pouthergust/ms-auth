import JWT from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from '../repositories/user.repositories';

async function bearerAuthenticantionMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            throw new Error('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ')

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido')
        }

        const tokenPayload = JWT.verify(token, 'my_secret_key')

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) { 
            throw new ForbiddenError('Token invalido')
        }

        const uuid =  tokenPayload.sub
        const user = await userRepository.findById(uuid)
        req.user = user
        next()
    } catch (err) {
        next(err);
    }
}

export default bearerAuthenticantionMiddleware;