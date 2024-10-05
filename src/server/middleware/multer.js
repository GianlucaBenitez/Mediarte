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
  console.log("Mimetype recibido:", file.mimetype);
  if (
    file.mimetype !== "audio/mpeg" && 
    file.mimetype !== "audio/ogg" && 
    file.mimetype !== "audio/opus" &&
    file.mimetype !== "audio/wave" &&
    file.mimetype !== "audio/flac") {
    req.fileValidationError = "El archivo debe ser mp3, ogg, opus, wav o flac";

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