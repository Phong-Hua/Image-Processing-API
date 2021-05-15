import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const fileExists = (fileName: string): boolean => {
  const imageLocation = path.join(
    __dirname,
    '../../images/',
    `${fileName}.jpg`
  );
  const exist = fs.existsSync(imageLocation);
  return exist;
};

const createSuccessObject = (outputImage: string) => {
  return { success: true, outputImage, error: undefined };
};

const createFailureObject = (error: string) => {
  return { success: false, outputImage: undefined, error };
};

export const resize = async (
  imageName: string,
  width: number,
  height: number
): Promise<{
  success: boolean;
  outputImage: undefined | string;
  error: undefined | string;
}> => {
  if (!imageName) return createFailureObject('The filename is missing');
  if (!width) return createFailureObject('The width is missing');
  if (!height) return createFailureObject('The height is missing');

  if (!fileExists(imageName))
    return createFailureObject('The required image does not exist');

  const inputImage = path.join(__dirname, '../../images', `${imageName}.jpg`);

  // output filename is something like : fileNamexWidthxHeight.jpg
  try {
    const outputImage = path.join(
      __dirname,
      '../../images',
      `${imageName}x${width}x${height}.jpg`
    );

    // if the outputImage already exist => we return that output image, otherwise, we need to use sharp to write image to that file
    if (fileExists(outputImage)) return createSuccessObject(outputImage);

    await sharp(inputImage).resize(width, height).jpeg().toFile(outputImage);
    return createSuccessObject(outputImage);
  } catch (err) {
    return createFailureObject('Unable to resize the image');
  }
};
