import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function callOpenAI(model, messages) {
  const completion = await openai.chat.completions.create({
    model,
    messages,
  });

  return completion.choices[0]?.message?.content || '⚠️ No response from OpenAI';
}
