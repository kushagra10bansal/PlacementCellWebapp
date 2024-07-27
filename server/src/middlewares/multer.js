import multer from 'multer';

// Resume Storage on Disk
let resumeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp/')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '_' + file.originalname.replace(/ /g,'')) // replace - to remove all white spaces

        // if(!file.originalname.match(/\.(pdf)$/)) {
        //     let err = new Error();
        //     err.code = 'filetype';
        //     return cb(err);
        // } else {
        //     cb(null,Date.now() + '_' + file.originalname.replace(/ /g,'')) // replace - to remove all white spaces
        // }
    }
});

// Upload
const upload = multer({
    storage: resumeStorage,
    limits : { fileSize : 10000000 }
});

export { upload }