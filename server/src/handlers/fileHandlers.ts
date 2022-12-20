const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Uploads",
  },
});

export const Images = async (data: any) => {
console.log("🚀 ~ file: fileHandlers.ts:23 ~ Images ~ data", data)

  let data_: any = []
  await data?.map(async (e: any) => {
    await data_.push(e.path)
  })
  return data_
}
export const upload = multer({ storage: storage });



