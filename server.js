const express = require('express');
const axios = require('axios'); // ← axios を使って送信
const app = express();
const PORT = process.env.PORT || 3000;

// Slack Webhook URL（提督が渡したURLをここに貼ってください）
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

app.get('/', (req, res) => {
  res.send('FX Notify Server is running!');
});

app.get('/notify', async (req, res) => {
  const text = req.query.text || '通知テスト（内容未指定）';

  try {
    await axios.post(SLACK_WEBHOOK_URL, { text });
    res.send(`Slack通知を送信しました：${text}`);
  } catch (error) {
    console.error('Slack通知エラー:', error.message);
    res.status(500).send('Slack通知に失敗しました。');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
