import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [{ userName: 'Gabriel' }];
    res.status(StatusCodes.OK).send(users);
})

usersRoute.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    
    res.sendStatus(StatusCodes.OK);
})

usersRoute.post('/users', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    res.status(StatusCodes.CREATED).send(req.body);
});

usersRoute.put('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifierdUser = req.body;

    modifierdUser.uuid = uuid;

    res.status(StatusCodes.OK).send({ modifierdUser });
});

usersRoute.delete('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
