import { Schema, model } from 'mongoose';

export interface IUserFile {
  // _id: string;
  user_id: string;
  file_url: string;
  file_title: string;
  createdAt: string;
  updatedAt: string;
}

const userFileSchema = new Schema<IUserFile>(
  {
    // _id: {
    //   type: String,
    //   required: false
    // },
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
  },
  {
    timestamps: true
  }
);

const UserFile = model<IUserFile>('UserFile', userFileSchema);

export default UserFile;
