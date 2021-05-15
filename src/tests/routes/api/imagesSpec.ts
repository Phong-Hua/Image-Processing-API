import supertest from 'supertest';
import app from '../../../index';
import { fileExists } from '../../../utilities/imageProcessor';

describe('Testing image endpoint', () => {
  let request: supertest.SuperTest<supertest.Test>;
  beforeAll(function () {
    request = supertest(app);
  });

  it('expect status 200 when request an existing image with positive dimension', async () => {
    const imageName = 'fjord';
    const dimension = 200;
    const url = `/api/images?filename=${imageName}&width=${dimension}&height=${dimension}`;

    const response = await request.get(url);
    expect(response.statusCode).toBe(200);
  });
  it('expect status 400 when request an exist that does not exist', async () => {
    const imageName = 'thisimagedoesnotexist';
    expect(fileExists(imageName)).toBeFalse();

    const dimension = 200;
    const url = `/api/images?filename=${imageName}&width=${dimension}&height=${dimension}`;

    const response = await request.get(url);
    expect(response.statusCode).toBe(400);

    console.log(response.text);
  });

  it('expect status 400 when request an image with negative dimension', async () => {
    const imageName = 'fjord';
    expect(fileExists(imageName)).toBeTrue();

    const dimension = -200;
    const url = `/api/images?filename=${imageName}&width=${dimension}&height=${dimension}`;

    const response = await request.get(url);
    expect(response.statusCode).toBe(400);

    console.log(response.text);
  });

  it('expect status 400 when request an image with 0 dimension', async () => {
    const imageName = 'fjord';
    expect(fileExists(imageName)).toBeTrue();

    const dimension = 0;
    const url = `/api/images?filename=${imageName}&width=${dimension}&height=${dimension}`;

    const response = await request.get(url);
    expect(response.statusCode).toBe(400);

    console.log(response.text);
  });

  it('expect status 400 when request an image and does not provide dimension', async () => {
    const imageName = 'fjord';
    expect(fileExists(imageName)).toBeTrue();

    const url = `/api/images?filename=${imageName}`;

    const response = await request.get(url);
    expect(response.statusCode).toBe(400);
  });
});
