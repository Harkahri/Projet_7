const sharp = require("sharp");
const fs = require("fs");

const MAX_IMAGE_SIZE = 1000;

const compressImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const imagePath = req.file.path;
  const fileName = req.file.filename.split(".")[0];
  const compressedFileName = `${fileName}${Date.now()}.webp`;
  const compressedImagePath = `${req.file.destination}/${compressedFileName}`;

  sharp(imagePath)
    .metadata()
    .then((metadata) => {
      let { width, height } = metadata;

      if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
        if (width > height) {
          width = MAX_IMAGE_SIZE;
          height = null;
        } else {
          height = MAX_IMAGE_SIZE;
          width = null;
        }
      }

      compressAndSaveImage(imagePath, compressedImagePath, width, height)
        .then(() => {
          req.file.filename = compressedFileName;
          req.file.path = compressedImagePath;
          fs.unlinkSync(imagePath);
          next();
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ error: "Error during image compression" });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Error during image processing" });
    });
};

const compressAndSaveImage = (sourcePath, destinationPath, width, height) => {
  return new Promise((resolve, reject) => {
    sharp(sourcePath)
      .resize(width, height)
      .webp()
      .toFile(destinationPath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
  });
};

module.exports = compressImage;
