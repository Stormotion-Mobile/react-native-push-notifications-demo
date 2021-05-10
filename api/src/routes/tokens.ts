import cuid from 'cuid';
import express from 'express';
import DeviceToken from '../models/DeviceToken';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tokens = await DeviceToken.query();

    res.status(200).json({ tokens });
  } catch (error) {
    console.log('Get tokens error', error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const token = await DeviceToken.query().findById(req.params.id);

    res.status(200).json({ token });
  } catch (error) {
    console.log('Get a token error', error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const count = await DeviceToken.query()
      .findById(req.params.id)
      .patch(req.body);

    res.status(200).json({ count });
  } catch (error) {
    console.log('Update a token error', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const id = cuid();
    const token = await DeviceToken.query().insert({ id, ...req.body });

    res.status(200).json({ token });
  } catch (error) {
    console.log('Post a token error', error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await DeviceToken.query().findById(req.params.id).delete();

    res.status(200).json({ count });
  } catch (error) {
    console.log('Delete a token error', error);
  }
});

export default router;
