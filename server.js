// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/notify', async (req, res) => {
  const webhookUrl = 'https://hooks.slack.com/services/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';
  const message = {
    text: '【通知テスト】Slack Bot からの送信に成功しました。',
  };

  try {
    await axios.post(webhookUrl, message);
    console.log('通知送信に成功しました。');
    res.status(200).send('Slack通知を送信しました。');
  } catch (error) {
    console.error('Slack通知エラー:', error.message);
    res.status(500).send('通知に失敗しました。');
  }
});

app.get('/', (req, res) => {
  res.send('FX Notify Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
