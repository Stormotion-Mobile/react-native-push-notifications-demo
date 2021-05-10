import cuid from 'cuid';
import express from 'express';
import Article from '../models/Article';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await Article.query();

    res.status(200).json({ articles });
  } catch (error) {
    console.log('Get articles error', error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.query().findById(req.params.id);

    res.status(200).json({ article });
  } catch (error) {
    console.log('Get a article error', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const id = cuid();
    const article = await Article.query().insert({ id, ...req.body });

    res.status(200).json({ article });
  } catch (error) {
    console.log('Post an article error', error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Article.query().findById(req.params.id).delete();

    res.status(200).json({ count });
  } catch (error) {
    console.log('Delete an article error', error);
  }
});

export default router;
