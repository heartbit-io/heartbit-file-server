import { Request, Response } from 'express';
import UserFile from '../models/UserFileSchema';
import RareData from '../lib/RareData';
import FormatResponse from '../lib/FormatResponse';
import { HttpCode } from '../util/httpCode';
import FileChecks from '../lib/FileChecks';
import { unlink } from 'fs';

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

    try {
      if (!req.file) {
        return res
          .status(HttpCode.BAD_REQUEST)
          .json(
            new FormatResponse(
              true,
              HttpCode.BAD_REQUEST,
              'Select file to upload',
              null
            )
          );
      }

      const file: Express.Multer.File = req.file;

      const file_checks = new FileChecks(file);

      const file_type_status: boolean = file_checks.checkFileType();
      const file_size_status: boolean = file_checks.checkFileSize();

      if (!file_type_status || !file_size_status ) {
        unlink(file.path, () => { return; });
        return res
          .status(HttpCode.BAD_REQUEST)
          .json(
            new FormatResponse(
              true,
              HttpCode.BAD_REQUEST,
              'Only images and pdf files are permitted with maximum file size of 1MB',
              null
            )
          );
      }
      // const encryptedFile = RareData.encryptData(req.body.user_id, file_url);

      const newFile = new UserFile({ ...req.body, file_url: file.path });

      const result = await newFile.save();

      return res
        .status(HttpCode.CREATED)
        .json(
          new FormatResponse(
            true,
            HttpCode.CREATED,
            'User file saved successfully',
            result
          )
        );
    } catch (e) {
      return res
        .status(422)
        .json(new FormatResponse(false, HttpCode.BAD_REQUEST, e, null));
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
        .status(HttpCode.OK)
        .json(
          new FormatResponse(true, HttpCode.OK, 'All user files', user_files)
        );
    } catch (error) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json(new FormatResponse(false, HttpCode.BAD_REQUEST, error, null));
    }
  },

  async getUserFile(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user_file = await UserFile.findById(id);

      // const file = RareData.decryptData(user_id, user_file?.file_url)

      return res
        .status(HttpCode.OK)
        .json(
          new FormatResponse(
            true,
            HttpCode.OK,
            'successfully retrieved file',
            user_file
          )
        );
    } catch (error) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json(new FormatResponse(false, HttpCode.BAD_REQUEST, error, null));
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
    const { id } = req.params;

    try {
      const delete_status = await UserFile.findByIdAndDelete(id);

      if (delete_status) {
        return res
          .status(HttpCode.OK)
          .json(
            new FormatResponse(
              true,
              HttpCode.OK,
              `file ${id} deleted successfully`,
              null
            )
          );
      } else {
        return res
          .status(HttpCode.NOT_FOUND)
          .json(
            new FormatResponse(
              false,
              HttpCode.NOT_FOUND,
              `file ${id} does not exist`,
              null
            )
          );
      }
    } catch (error) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json(new FormatResponse(false, HttpCode.BAD_REQUEST, error, null));
    }
  }
};

export default UserFileController;
