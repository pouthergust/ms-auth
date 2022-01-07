import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepositories from '../repositories/user.repositories';

export default async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de authenticação inválido');
        }

        const tokenPayload = JWT.verify(token, 'my-secret-key');
        
        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new ForbiddenError('Token Invalido')
        }
        
        const uuid = tokenPayload.sub
        const user = await userRepositories.findById(uuid);
        
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}