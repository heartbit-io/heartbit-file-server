import { log, error } from 'console';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const db_url = process.env.DB_URL;

mongoose.Promise = global.Promise;

if (!db_url) {
  error(`The database connection is not set`);
  process.exit(1);
}

const dbconnection = async (): Promise<void> => {
  try {
      await mongoose.connect(db_url);
    log('connected to database successfully');
  } catch (error) {
    logger.error(error);
  }
};


export default dbconnection;

