import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function logUsage({ chat_id, model, prompt, result }) {
  await supabase.from('ai_logs').insert({
    chat_id,
    model,
    prompt,
    response: result,
  });
}
