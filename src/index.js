const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const ExifImage = require('exif').ExifImage;

const getExifData = promisify(ExifImage);

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error('You have to specify directory path containing photos to process!');
  process.exit(1);
}

fs.readdirSync(directoryPath, { encoding: 'utf8' })
  .map(fileName => fileName.toLowerCase())
  .filter(fileName => (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')))
  .forEach(async fileName => {
    const filePath = path.join(directoryPath, fileName);

    try {
      const exifData = await getExifData({ image: filePath });

      const photoDate = exifData.exif.CreateDate; // 2018:04:29 12:32:44
      const [date, time] = photoDate
        .split(' ')
        .map(s => s.replace(/:/g, ''));

      const extension = path.extname(fileName);

      const newFileName = `IMG_${date}_${time}${extension}`;
      const newFilePath = path.join(directoryPath, newFileName);

      fs.renameSync(filePath, newFilePath);

      console.log(`${newFileName} <- ${filePath}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
