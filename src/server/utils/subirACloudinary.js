const subirACloudinary = async (req, res) => {
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ error: "File not found" });
    }
  
    const fName = file.originalname.split(".")[0];
  
    try {
      const audio = await cloudinary.uploader.upload(file.path, {
        resource_type: "video",
        public_id: `audios/${fName}`,
        format: 'mp3', 
        transformation: [
          { quality: 'auto:low', audio_codec: 'mp3', audio_bitrate: '96k' }
        ]
      });
  
      return audio;
    } catch (error) {
      console.log(error);
      return res.status(400).json({error: "Internal Server Error"});
    }
};

export default subirACloudinary;