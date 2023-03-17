import { Schema, model } from 'mongoose';

interface IUserFile {
  user_id: string;
  file_url: string;
  file_title: string;
}

const userFileSchema = new Schema<IUserFile>({
  user_id: {
    type: String,
    required: true
  },
  file_url: {
    type: String,
    required: true
  },
  file_title: {
    type: String,
    required: true
  }
});

const UserFile = model<IUserFile>('UserFile', userFileSchema);

export default UserFile;
