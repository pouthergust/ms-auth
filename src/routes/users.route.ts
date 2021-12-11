import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepositories from '../repositories/user.repositories';

const usersRoute = Router();

// GET /users
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepositories.findAllUsers();
    res.status(StatusCodes.OK).send(users);
})

// GET /users/:uuid
usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepositories.findById(uuid)
        
        res.status(StatusCodes.OK).send(user);
    } catch (error) {
        next(error);
    }
})

// POST /users
usersRoute.post('/users', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepositories.create(newUser);
    
    res.status(StatusCodes.CREATED).send(uuid);
});

// PUT /users/:uuid
usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifierdUser = req.body;

    modifierdUser.uuid = uuid;

    await userRepositories.update(modifierdUser)

    res.status(StatusCodes.OK).send();
});

// DELETE /users/:uuid
usersRoute.delete('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepositories.remove(uuid)
    
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
