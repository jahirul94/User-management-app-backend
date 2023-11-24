import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.routes';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
