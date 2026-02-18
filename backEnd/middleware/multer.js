import multer from "multer";

// Storage configuration using disk storage
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// Initialising the upload middleware with the storage configuration
const upload = multer({ storage })

export default upload