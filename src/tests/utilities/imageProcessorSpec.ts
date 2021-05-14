import fileType from 'file-type';
import imageSize from 'image-size';
import {resize, fileExists} from '../../utilities/imageProcessor';

describe('Test image processor using sharp', ()=>{

    it('expect the input file fjord exist', ()=>{
        const imageName = 'fjord';
        const exist = fileExists(imageName);
        expect(exist).toBeTrue();
    });

    it('expect the input file imageDoesnotExist does not exist', ()=>{
        const imageName = 'imageDoesnotExist';
        const exist = fileExists(imageName);
        expect(exist).toBeFalse();
    });

    it('expect the image return is jpg file', async()=>{
        const imageName = 'fjord';
        const dimension = 200;
        const result = await resize(imageName, dimension, dimension);
        expect(result.success).toBeTrue();

        const type = await fileType.fromFile((result.outputImage as unknown) as string);
        expect(type?.ext).toEqual('jpg');
    });

    it('expect the return image size is 200x200', async()=>{
        const imageName = 'fjord';
        const dimension = 200;
        const result = await resize(imageName, dimension, dimension);
        expect(result.success).toBeTrue();

        const size = imageSize((result.outputImage as unknown) as string);
        expect(size.width).toBe(dimension);
        expect(size.height).toBe(dimension);
    })


    it('expect sucess is false when resize the image does not exist', async()=>{
        const imageName = 'imageDoesnotExist';
        const dimension = 200;
        const result = await resize(imageName, dimension, dimension);
        expect(result.success).toBeFalse();
    })

    it('expect sucess is false when resize the image with negative dimension', async()=>{
        const imageName = 'fjord';
        const dimension = -200;
        const result = await resize(imageName, dimension, dimension);
        expect(result.success).toBeFalse();
    })
})