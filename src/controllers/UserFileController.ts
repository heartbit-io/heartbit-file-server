import { Request, Response } from 'express';
import UserFile from '../models/userFileSchema';

const UserFileController = {
  /**
   * @description - create given file
   * @params - {object}
   * @returns - {object}
   */
  async createFile(req: Request, res: Response) {
    const file_url = req.file?.filename;
    
    const newFile = new UserFile({ ...req.body, file_url });

    try {
      const result = await newFile.save();

      return res.status(201).json({
        status: true,
        message: 'User file created successfully',
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error,
        data: null
      });
    }
  },

  /**
   * @description - retrieve given file
   * @param req
   * @param res
   * @returns
   */
  async getUserFiles(req: Request, res: Response) {
    const { user_id } = req.params;

    try {
      const user_files = await UserFile.find({ user_id });

      return res.status(200).json({
        status: true,
        message: "Successfully retrieved users' files",
        data: user_files
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }
  },

  async getUserFile(req: Request, res: Response) {
    const { file_url } = req.params;

    try {
      const user_file = await UserFile.findOne({ file_url });

      return res.status(200).json({
        status: true,
        message: "Successfully retrieved file",
        data: user_file
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }
  },


  /**
   * @description - delete given file
   * @param req 
   * @param res 
   * @returns 
   */
  async deleteFile(req: Request, res: Response) {
    const { file_url } = req.params;

    try {
      await UserFile.deleteOne({ file_url });

      return res.status(200).json({
        status: true,
        message: `File ${file_url} deleted successfully`,
        data: null
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }
  }
};

export default UserFileController;
