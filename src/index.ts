import * as dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';
import dbconnection from './util/dbconnection';
import { log } from 'console';
import { HttpCode } from './util/httpCode';
import logger from './util/logger';
import FormatResponse from './lib/FormatResponse';

dotenv.config();

if (!process.env.PORT) {
  logger.error('Port is not set');
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Application = express();

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
  const message = `Route ${req.originalUrl} not found`;
  logger.warn(message);
  return res
    .status(HttpCode.NOT_FOUND)
    .json(new FormatResponse(false, HttpCode.NOT_FOUND, message, null));
});

app.listen(PORT, async () => {
  await dbconnection();
  log(`Listening on port ${PORT}`);
  logger.info(`Listening on port ${PORT}`);
});

export default app;
