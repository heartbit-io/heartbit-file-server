import { log } from 'console';
import mongoose from 'mongoose';

const dbconnection = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/fileserver');
      log('connected to database successfully');
  } catch (error) {
    log(error);
  }
};


export default dbconnection;
