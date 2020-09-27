import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  multer: multer({
    limits: {
      fileSize: 2000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
        return cb(new Error('Invalid image format.'));

      return cb(null, true);
    },
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, cb) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return cb(null, fileName);
      },
    }),
  }),
};
