const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Slack Webhook URL（環境変数から取得）
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

app.get('/', (req, res) => {
  res.send('FX Notify Server is running!');
});

app.get('/notify', async (req, res) => {
  if (!webhookUrl) {
    return res.status(500).send('Webhook URL not set');
  }

  try {
    await axios.post(webhookUrl, {
      text: 'FX通知テスト送信です。'
    });
    res.send('通知成功');
  } catch (error) {
    console.error('通知エラー:', error.message);
    res.status(500).send('通知失敗');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
