// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// SlackのWebhook URL（提督のURLに置き換える）
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/〇〇〇/〇〇〇/〇〇〇'; // 実際のURLに変更！

app.get('/', (req, res) => {
  res.send('FX Notify Server is running!');
});

// 通知送信エンドポイント
app.get('/notify', async (req, res) => {
  const text = req.query.text || 'テスト通知';
  try {
    await axios.post(SLACK_WEBHOOK_URL, { text });
    res.send('通知を送信しました');
  } catch (error) {
    res.status(500).send('通知送信に失敗しました');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
