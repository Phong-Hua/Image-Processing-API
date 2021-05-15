import express from 'express';
import { resize } from '../../utilities/imageProcessor';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename as unknown as string;
  const width = parseInt(req.query.width as unknown as string);
  const height = parseInt(req.query.height as unknown as string);

  const result = await resize(filename, width, height);

  if (result.success) {
    res.sendFile(result.outputImage as unknown as string);
  } else {
    res.status(400).send(result.error);
  }
});

export default images;
