import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const createImagePath = (filename: string) => {
  const imagePath = path.join(__dirname, '../../images/', `${filename}.jpg`);
  return imagePath;
};

export const fileExists = (imageName: string): boolean => {
  const imagePath = createImagePath(imageName);
  const exist = fs.existsSync(imagePath);
  return exist;
};

const createSuccessObject = (outputImage: string, cache: boolean) => {
  return { success: true, outputImage, cache, error: undefined };
};

const createFailureObject = (error: string) => {
  return { success: false, outputImage: undefined, cache: false, error };
};

export const resize = async (
  imageName: string,
  width: number,
  height: number
): Promise<{
  success: boolean;
  outputImage: undefined | string;
  cache: boolean;
  error: undefined | string;
}> => {
  if (!imageName) return createFailureObject('The filename is missing');
  if (!width) return createFailureObject('The width is missing');
  if (!height) return createFailureObject('The height is missing');

  if (!fileExists(imageName))
    return createFailureObject('The required image does not exist');

  // output filename is something like : fileNamexWidthxHeight.jpg
  try {
    const outputImage = `${imageName}x${width}x${height}`;
    const outputPath = createImagePath(outputImage);
    // if the outputImage already exist => we return that output image, otherwise, we need to use sharp to write image to that file
    if (fileExists(outputImage)) return createSuccessObject(outputPath, true);

    const inputPath = createImagePath(imageName);
    await sharp(inputPath).resize(width, height).jpeg().toFile(outputPath);
    return createSuccessObject(outputPath, false);
  } catch (err) {
    return createFailureObject('Unable to resize the image');
  }
};
