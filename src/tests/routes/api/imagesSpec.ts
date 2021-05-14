import supertest from 'supertest';
import app from '../../../index';

describe("Testing image endpoint", ()=>{

    // let request : supertest.SuperTest<supertest.Test>;
    // beforeAll(function(){
    //     request = supertest(app);
    // })

    // it("expect to receive status 200 when visit /api/images endpoint", async(done)=>{
    //     const url = '/api/images';
    //     const response = await request.get(url);
    //     expect(response.statusCode).toBe(200);
    //     done();
    // })

    // it("expect to receive status 200 when request image filename='fjord.jpg' ", async(done)=>{
    //     const image = 'fjord.jpg';
    //     const url = `/api/images?filename=${image}`;
    //     const response = await request.get(url);
    //     expect(response.statusCode).toBe(200);
    //     done();
    // })

    // it("expect to receive status 200 when request image filename='fjord.jpg' with width=200 and height=200", async(done)=>{
    //     const image = 'fjord.jpg';
    //     const dimension = 200;
    //     const url = `/api/images?filename=${image}&width=${dimension}&height=${dimension}`;
    //     const response = await request.get(url);
    //     expect(response.statusCode).toBe(200);
    //     done();
    // })
})