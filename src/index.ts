import express, { Request, Response, NextFunction } from 'express';
import errorHandler from './middleware/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();
const port = 3000;

// Config da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config das rotas
app.use(statusRoute);
app.use(usersRoute);

// Config dos handlers de error
app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Aplicação executando na porta: ${port}`)
})