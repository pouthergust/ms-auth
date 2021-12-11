import { Router, Request, Response, NextFunction }from "express";
import { StatusCodes } from "http-status-codes";

const statusRoute  = Router();

statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => { 
    res.sendStatus(StatusCodes.OK);
});

// app.get('/status', (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).send({ foo: 'Aooba' });
// });

export default statusRoute;