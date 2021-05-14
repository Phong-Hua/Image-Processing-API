import express from 'express';
import path from 'path';

const routes = express.Router();

routes.get('/', (req, res)=>{

    const imageLocation = path.join(__dirname, '../../../images/', 'fjord.jpg');

    res.sendFile(imageLocation);
    // res.send('Main api');
})

export default routes;