import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepositories from "../repositories/user.repositories";

export default async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction)  {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de authenticação inválido');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':');
        
        if (!username || !password) {
            throw new ForbiddenError('credenciais não preenchidas');
        }
        
        const user = await userRepositories.findByUsernameAndPassword(username, password);

        if (!user) {
            throw new ForbiddenError('credenciais inválidas');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}