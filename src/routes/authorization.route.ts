import { NextFunction, Router, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepositories from "../repositories/user.repositories";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middleware/basic-auth.middleware";


const authorizationRoute = Router();

// metodoHTTP(rota, middleware, callback)
authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if(!user) {
            throw new ForbiddenError('Usuario não informado')
        }

        const jwt = JWT.sign({
            username: user.username,
        }, 
        'my-secret-key', 
        {
            subject: user?.uuid
        })

        res.status(StatusCodes.OK).json({ token: jwt})

    } catch (error) {
        next(error);
    }
})

export default authorizationRoute;



