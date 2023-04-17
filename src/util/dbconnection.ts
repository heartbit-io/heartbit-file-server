import { log, error } from 'console';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

if (!process.env.NODE_ENV) {
  error('Please set environment');
  process.exit(1);
}

const db_url = (process.env.NODE_ENV === 'test') ? process.env.TEST_DB_URL : process.env.DB_URL;

mongoose.Promise = global.Promise;

if (!db_url) {
  error(`Please set connections for both main and test databases`);
  process.exit(1);
}


const dbconnection = async (): Promise<void> => {
  try {
      await mongoose.connect(db_url);
    log(`connected to ${process.env.NODE_ENV} database successfully`);
  } catch (error) {
    logger.error(error);
  }
};


export default dbconnection;

