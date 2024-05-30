import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.resolve('./public/temp');
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.error('Failed to create directory:', err);
                return cb(err);
            }
            cb(null, dir);
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });
