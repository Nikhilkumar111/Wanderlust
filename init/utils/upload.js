const multer = require("multer");
const { storage } = require("../cloudConfig");

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    allowed.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error("Only image files allowed"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
