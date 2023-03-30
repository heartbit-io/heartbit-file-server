import * as path from 'path';

class FileChecks {
  file: Express.Multer.File;

  constructor(file: Express.Multer.File) {
    this.file = file;
  }

  checkFileType(): boolean {
    const extension: boolean =
      ['.png', '.jpg', '.jpeg', 'pdf'].indexOf(
        path.extname(this.file.originalname).toLowerCase()
      ) >= 0;
    const mime_type: boolean =
      ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].indexOf(
        this.file.mimetype
      ) >= 0;

    if (extension && mime_type) {
      return true;
    }
    return false;
  }
    
    checkFileSize():boolean {
        const max_file_size = 1024 * 1024;

        if (this.file.size > max_file_size) {
            return false;
        }
        return true;
    }
}

export default FileChecks;
