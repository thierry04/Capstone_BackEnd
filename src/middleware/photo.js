import cloudinary from '../config/cloudinary';

const blogImage = async (req) => {
  console.log(req.files);
  const tmp = req.file.path;
  const results = await cloudinary.uploader.upload(tmp, (_, result) => result);
  return results;
};

export default blogImage;
