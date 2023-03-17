import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';
import dbconnection from './util/dbconnection';
import { log } from 'console';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

//database connection
dbconnection();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//handle cors
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token'
  );
  next();
});

app.use(routes);

// UnKnown Routes
app.all('*', (req: Request, res: Response) => {
  return res.status(404).json({
    status: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  log(`Listening on port ${PORT}`);
});
