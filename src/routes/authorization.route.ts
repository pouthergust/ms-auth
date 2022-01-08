import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middleware/basic-authentication.middleware";
import jwtAuthenticantionMiddleware from "../middleware/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', 
    basicAuthenticationMiddleware, 
    async (req: Request, res: Response, next: NextFunction) => {
        try {    
            const user = req.user

            if (!user) {
                throw new ForbiddenError('Usuario não informado')
            }

            const jwt = JWT.sign({ username: user.username }, 'my_secret_key', { subject: user.uuid })
            res.status(StatusCodes.OK).json({ token: jwt })
        } catch (error) {
            next(error)
        }
    }
)

authorizationRoute.post('/token/validate', 
    jwtAuthenticantionMiddleware, 
    (req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(StatusCodes.OK)
    }
)

export default authorizationRoute;
