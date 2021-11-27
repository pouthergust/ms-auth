import express, { Request, Response, NextFunction } from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(statusRoute);
app.use(usersRoute);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'Aooba' });
});

app.listen(port, () => {
    console.log(`Aplicação executando na porta: ${port}`)
})