import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const resize = async (imageName: string, width: number, height: number) => {

    if (!fileExists(imageName))
        return {success : false, outputImage : undefined, error: 'The required image does not exist'}

    const inputImage = path.join(__dirname, '../../images', `${imageName}.jpg`);

    // output filename is something like : fileNamexWidthxHeight.jpg
    try
    {
        const outputImage = path.join(__dirname, '../../images', `${imageName}x${width}x${height}.jpg`);

        // if the outputImage already exist => we return that output image, otherwise, we need to use sharp to write image to that file
        if(fileExists(outputImage))
            return {success : true, outputImage, error : undefined}

        await sharp(inputImage).resize(width, height).jpeg().toFile(outputImage);
            return {success : true, outputImage, error : undefined}
    }
    catch (err)
    {
        return {success : true, outputImage : undefined, error : err}
    }
}

export const fileExists = (fileName: string) => {
    const imageLocation = path.join(__dirname, '../../images/', `${fileName}.jpg`);
    const exist = fs.existsSync(imageLocation);
    return exist;
}