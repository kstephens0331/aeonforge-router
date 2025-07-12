const express = require('express');
const dotenv = require('dotenv');
const { Octokit } = require('@octokit/rest');
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

app.get('/process', async (req, res) => {
  try {
    const { data: requests } = await supabase
      .from('requests')
      .select('*')
      .eq('status', 'pending')
      .limit(1);

    if (!requests.length) return res.send('No pending requests');

    const request = requests[0];
    const prompt = `Write a clean, production-grade React component or layout for this: ${request.prompt}`;

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const code = aiResponse.choices[0].message.content;
    const fileName = slugify(request.prompt) + '.jsx';
    const filePath = `src/generated/${fileName}`;

    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_USER,
      repo: process.env.GITHUB_REPO,
      path: filePath,
      message: `🧠 Auto-generated: ${request.prompt}`,
      content: Buffer.from(code).toString('base64'),
      branch: 'main',
    });

    await supabase
      .from('requests')
      .update({ status: 'done', output: filePath })
      .eq('id', request.id);

    res.send(`✅ File committed: ${filePath}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error processing request');
  }
});

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
}

app.listen(port, () => {
  console.log(`🧠 Router listening on port ${port}`);
});
