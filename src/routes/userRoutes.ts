import express from 'express';
import UserFileController from '../controllers/UserFileController';
import { newFile } from '../validation/fileSchema';
import validate from '../middleware/validator';
import { uploadFile } from '../middleware/upload';

const router = express.Router();

router.post(
  '/create',
  uploadFile.single('file'),
  validate(newFile),
  UserFileController.createFile
);

router.get('/files/:id', UserFileController.getUserFile);

router.get('/:user_id', UserFileController.getUserFiles);

router.delete('/:id', UserFileController.deleteFile);

export { router as userRoutes };
