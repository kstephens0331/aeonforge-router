import fetch from 'node-fetch';

export default async function callMistral(messages) {
  const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistral-small',
      messages,
    }),
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '⚠️ No response from Mistral';
}
