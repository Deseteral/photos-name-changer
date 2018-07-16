const fs = require('fs');
const path = require('path');
const ExifImage = require('exif').ExifImage;

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error('You have to specify directory path containing photos to process!');
  process.exit(1);
}

const files = fs.readdirSync(directoryPath, { encoding: 'utf8' });
console.log(files);
const photos = files.filter(filename => (
    filename.toLowerCase().endsWith('.jpg') ||
    filename.toLowerCase().endsWith('.jpeg')
  ));

photos.forEach(filename => {
  const filepath = path.join(directoryPath, filename);
  ExifImage({ image: filepath }, (err, exifData) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const photoDate = exifData.exif.CreateDate; // 2018:04:29 12:32:44

    const [date, time] = photoDate
      .split(' ')
      .map(s => s.replace(/:/g, ''));

    const extension = path.extname(filename);

    const newFilename = `IMG_${date}_${time}${extension}`;
    const newFilePath = path.join(directoryPath, newFilename);

    fs.renameSync(filepath, newFilePath);

    console.log(`${newFilename} <- ${filepath}`);
  });
});
