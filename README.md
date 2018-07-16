# photos-name-changer

Renames all `jpg` and `jpeg` files in given directory to match my standard of naming photo files:

`IMG_20180716_202230.jpg`

It uses EXIF data (via `node-exif`) to extract the date when the photo was taken.

## Usage
```bash
photos-name-changer <path_to_the_directory>
```

## License
This project is licensed under the [MIT license](LICENSE).
