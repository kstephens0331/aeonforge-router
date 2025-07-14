export default function routeModel(messages, override) {
  if (override) return override;

  const content = messages.map(m => m.content).join(' ').toLowerCase();

  if (content.includes('image') || content.includes('photo')) return 'dalle';
  if (content.includes('legal') || content.includes('agreement')) return 'claude';
  if (content.includes('research') || content.includes('summarize')) return 'gemini';
  if (content.includes('fast') || content.length < 100) return 'mistral';
  if (content.includes('current events') || content.includes('news')) return 'perplexity';

  return 'gpt-4'; // default fallback
}
