const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Slack Webhook URL（環境変数から取得）
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

app.get('/', (req, res) => {
  res.send('FX Notify Server is running.');
});

app.get('/notify', async (req, res) => {
  if (!webhookUrl) {
    return res.status(500).send('Webhook URL not configured.');
  }

  try {
    const message = {
      text: 'テスト通知：Slackへの送信に成功しました。'
    };

    await axios.post(webhookUrl, message);
    res.status(200).send('Notification sent.');
  } catch (error) {
    console.error('通知エラー:', error);
    res.status(500).send('通知に失敗しました。');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
