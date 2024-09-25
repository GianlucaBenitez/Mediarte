import cloudinary from "../config/cloudinary.js";

const borrarDeCloudinary = async (url_audio) => {
    try {
      const urlArray = url_audio.split('/');
      const nombreArchivo = urlArray[urlArray.length - 1].split('.')[0];
      const publicId = `audios/${nombreArchivo}`;
  
      await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal Server Error"})
    }
};

export default borrarDeCloudinary;