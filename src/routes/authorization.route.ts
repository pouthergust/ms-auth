import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repositories";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'] 

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ')

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')
        const [username, password] = tokenContent.split(':')

        if (!username || !password) {
            throw new ForbiddenError('Credenciais não informadas')
        }
    
        const user = await userRepository.findByUsernameAndPassword(username, password)

        if (!user) {
            throw new ForbiddenError('Usuario ou senha invalidos')
        }

        const jwt = JWT.sign({ username: user.username }, 'my_secret_key', { subject: user?.uuid })
        res.status(StatusCodes.OK).json({ token: jwt })
    } catch (error) {
        next(error)
    }
})

export default authorizationRoute;
