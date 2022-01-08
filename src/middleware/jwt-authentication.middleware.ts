import JWT from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";

async function jwtAuthenticantionMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            throw new Error('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ')

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido')
        }

       try {
            const tokenPayload = JWT.verify(token, 'my_secret_key')

            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) { 
                throw new ForbiddenError('Token invalido')
            }

            const user = {
                uudid: tokenPayload.sub,
                username: tokenPayload.username
            };
            req.user = user
            next()
       } catch (error) {
            throw new ForbiddenError('Token invalido')
       }
    } catch (err) {
        next(err);
    }
}

export default jwtAuthenticantionMiddleware;