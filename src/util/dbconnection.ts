import { log, error } from 'console';
import mongoose, { Error } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const db_url = process.env.DB_URL;

if (!db_url) {
  error(`The database connection is not set`);
  process.exit(1);
}

const dbconnection = async () => {
  try {
      await mongoose.connect(db_url);
      log('connected to database successfully');
  } catch (error) {
    log(error);
  }
};


export default dbconnection;

