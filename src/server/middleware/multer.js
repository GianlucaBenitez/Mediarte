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
  if (
    file.mimetype !== "audio/mpeg" && 
    file.mimetype !== "audio/mp3" &&
    file.mimetype !== "audio/ogg" && 
    file.mimetype !== "audio/opus" &&
    file.mimetype !== "audio/wav" &&
    file.mimetype !== "audio/flac") {
    req.fileValidationError = "El archivo debe ser mpeg, mp3, ogg, opus, wav o flac";

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