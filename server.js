const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

app.get('/', (req, res) => {
  res.send('FX Notify Server is running!');
});

app.get('/notify', async (req, res) => {
  try {
    await axios.post(webhookUrl, {
      text: '通知テスト：FXパターンを検出しました'
    });
    res.send('通知を送信しました');
  } catch (error) {
    console.error('通知送信エラー:', error.message);
    res.status(500).send('通知送信に失敗しました');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
