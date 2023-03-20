import { check } from 'express-validator';
import UserFile from '../models/userFileSchema';

const newFile = [
  check('user_id')
    .exists()
    .isString()
    .trim()
    .withMessage('User id is required'),

  check('file_title')
    .notEmpty()
    .isString()
    .trim()
    .withMessage('title of file is required')
    .custom(async (value, { req}) => {
      const file = await UserFile.findOne({
              user_id: req.body.user_id,
              file_title: value,
      });
        
        if (file) {
            throw new Error('User already have given file');
        }
    })
];


export { newFile };
