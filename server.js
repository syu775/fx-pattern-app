const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Renderの環境変数からWebhook URLを取得
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

app.get('/', (req, res) => {
  res.send('FX Notify Server is running!');
});

app.get('/notify', async (req, res) => {
  try {
    await axios.post(webhookUrl, {
      text: '【通知テスト】FXパターン検出しました！'
    });
    res.send('通知送信成功');
  } catch (err) {
    console.error('通知失敗:', err.message);
    res.status(500).send('通知失敗');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
