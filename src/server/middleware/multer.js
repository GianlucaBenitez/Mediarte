import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    let fileExt = file.originalname.split(".").pop();

    let fecha = new Date().getTime();
    const fileName = `mediarte-${fecha}.${fileExt}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "audio/mpeg" && file.mimetype !== "audio/mp3") {
    req.fileValidationError = "File type must be audio/mp3 or audio/mpeg";

    return cb(null, false, req.fileValidationError);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
}).single("audio");

export default upload;