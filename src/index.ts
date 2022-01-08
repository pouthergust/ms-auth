import express, { Request, Response, NextFunction } from 'express';
import bearerAuthenticantionMiddleware from './middleware/bearer-authentication.middleware';
import errorHandler from './middleware/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();
const port = 3000;

// Config da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config das rotas
app.use(statusRoute);
app.use(bearerAuthenticantionMiddleware, usersRoute);
app.use(authorizationRoute);

// Config dos handlers de error
app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Aplicação executando na porta: ${port}`)
})