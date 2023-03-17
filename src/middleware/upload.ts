import multer from 'multer';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const file_name = file.originalname;

    cb(null, `${Date.now()}${file_name.replaceAll(' ', '_')}`);
  }
});


const upload = multer({
  storage,
  limits: { fileSize: 500000 }
});

export default upload;
