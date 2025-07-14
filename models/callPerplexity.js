import fetch from 'node-fetch';

export default async function callPerplexity(messages) {
  const prompt = messages.map((m) => m.content).join('\n');

  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'pplx-7b-chat',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '⚠️ No response from Perplexity';
}
