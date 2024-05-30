import multer from 'multer';
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = './public/temp';
      fs.mkdirSync(dir, { recursive: true }); 
      cb(null, './public/temp');
    },

    // destination: function (req, file, cb) {
    //   cb(null, './public/temp');
    // },
    filename: function (req, file, cb) {
     
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  

  export const upload = multer({ storage: storage });
