import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function callDalle(messages) {
  const last = messages[messages.length - 1]?.content || 'Generate something creative';
  const image = await openai.images.generate({ prompt: last, n: 1, size: '512x512' });

  return `![Generated Image](${image.data[0].url})`;
}
