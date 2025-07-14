import express from 'express';
import routeModel from './routeModel.js';
import callModel from '../models/callModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { messages, model: userModel, chat_id } = req.body;

  try {
    const model = routeModel(messages, userModel);
    const result = await callModel(model, messages);

    res.json({ model, result });
  } catch (err) {
    console.error('❌ Error in /api/ask:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
