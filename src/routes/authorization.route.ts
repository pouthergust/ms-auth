import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authorizationRoute = Router();

authorizationRoute.post('/token', (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'] 

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas')
        }
    } catch (error) {
        next(error)
    }
})

export default authorizationRoute;
