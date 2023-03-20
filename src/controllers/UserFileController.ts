import { Request, Response } from 'express';
import UserFile from '../models/userFileSchema';
import RareData from '../lib/RareData';
import FormatResponse from '../lib/FormatResponse';

export interface ResponseFormat {
  status: boolean;
  message: string;
  data: null | object;
}

const UserFileController = {
  /**
   * @description - create given file
   * @params - {object}
   * @returns - {object}
   */
  async createFile(
    req: Request,
    res: Response
  ): Promise<Response<ResponseFormat>> {
    const file_url = req.file?.filename;

    // const encryptedFile = RareData.encryptData(req.body.user_id, file_url);

    const newFile = new UserFile({ ...req.body, file_url });

    try {
      const result = await newFile.save();

      return res
        .status(201)
        .json(
          new FormatResponse(true, 201, 'File created successfully', result)
        );
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
  async getUserFiles(
    req: Request,
    res: Response
  ): Promise<Response<ResponseFormat>> {
    const { user_id } = req.params;

    try {
      const user_files = await UserFile.find({ user_id });

      /**
       * TODO: decrypt file data here
       */
      return res
        .status(200)
        .json(new FormatResponse(true, 200, 'All user files', user_files));
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

      // const file = RareData.decryptData(user_id, user_file?.file_url)

      return res.status(200).json({
        status: true,
        message: 'Successfully retrieved file',
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
  async deleteFile(
    req: Request,
    res: Response
  ): Promise<Response<ResponseFormat>> {
    const { file_url } = req.params;

    try {
      await UserFile.deleteOne({ file_url });

      return res
        .status(200)
        .json({
          status: true,
          statusCode: 200,
          message: `fiel ${file_url} deleted successfully`,
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
