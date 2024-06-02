const cloudinary = require("cloudinary");

exports.imageUploaderCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
// exports.videoUploaderCloudinary = async (file, folder) => {
//   try {
//     console.log("sdfevdf");
//     const options = { folder };
//     // if (height) {
//     //   options.height = height;
//     // }
//     // if (quality) {
//     //   options.quality = quality;
//     // }
//     options.resource_type = "auto";
//     console.log(file.tempFilePath, options);
//     return await cloudinary.v2.uploader.upload(file.tempFilePath, options);
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw error; // Rethrow the error to propagate it to the calling code
//   }
// };
