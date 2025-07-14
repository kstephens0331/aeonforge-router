import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function callClaude(messages) {
  const lastUserMessage = messages.filter((m) => m.role === 'user').map(m => m.content).join('\n');

  const completion = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: lastUserMessage }],
  });

  return completion.content?.[0]?.text || '⚠️ No response from Claude';
}
