import callOpenAI from './callOpenAI.js';
import callClaude from './callClaude.js';
import callGemini from './callGemini.js';
import callMistral from './callMistral.js';
import callPerplexity from './callPerplexity.js';
import callDalle from './callDalle.js';

export default async function callModel(model, messages) {
  switch (model) {
    case 'gpt-4':
    case 'gpt-3.5':
      return await callOpenAI(model, messages);
    case 'claude':
      return await callClaude(messages);
    case 'gemini':
      return await callGemini(messages);
    case 'mistral':
      return await callMistral(messages);
    case 'perplexity':
      return await callPerplexity(messages);
    case 'dalle':
      return await callDalle(messages);
    default:
      throw new Error(`Unsupported model: ${model}`);
  }
}
