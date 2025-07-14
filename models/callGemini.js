import fetch from 'node-fetch';

export default async function callGemini(messages) {
  const prompt = messages.map((m) => `${m.role}: ${m.content}`).join('\n');

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No response from Gemini';
}
