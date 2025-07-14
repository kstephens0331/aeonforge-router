import express from 'express';
import callModel from '../utils/callModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  const models = ['gpt-4', 'claude-3-opus', 'gemini-pro', 'mistral-7b'];
  const results = {};

  for (const model of models) {
    try {
      const output = await callModel(prompt, model);
      results[model] = output;
    } catch (err) {
      results[model] = '❌ Error: ' + err.message;
    }
  }

  res.json(results);
});

export default router;
