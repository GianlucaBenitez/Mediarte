import { v2 as cloudinary } from 'cloudinary';
import {config} from "dotenv";
config();

cloudinary.config({
  cloud_name: 'de2ggefyf',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;