import express from 'express';
import UserFileController from '../controllers/UserFileController';
import upload from '../middleware/upload';
import validator from '../middleware/validator'
import { newFile } from '../validation/fileSchema'

const router = express.Router();

router.post('/create', upload.single('file'), validator(newFile),  UserFileController.createFile);

router.get('/files/:id', UserFileController.getUserFile);

router.get('/:user_id', UserFileController.getUserFiles);

router.delete('/:id', UserFileController.deleteFile);


export { router as userRoutes };
