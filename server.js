const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Slack Webhook URL（環境変数から取得）
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

app.get('/', (req, res) => {
  res.send('FX Notify Server is running');
});

app.get('/notify', async (req, res) => {
  try {
    if (!webhookUrl) {
      return res.status(500).send('SLACK_WEBHOOK_URL is not set.');
    }

    const payload = {
      text: '【通知成功】これはFX通知BotからのSlackテスト送信です。'
    };

    const result = await axios.post(webhookUrl, payload);

    if (result.status === 200) {
      res.send('Slack通知送信完了');
    } else {
      res.status(result.status).send(`Slack通知に失敗：status=${result.status}`);
    }
  } catch (err) {
    console.error('Slack通知エラー:', err.message);
    res.status(500).send('Slack通知中にエラーが発生しました');
  }
});

app.listen(PORT, () => {
  console.log(`FX通知サーバー起動中: http://localhost:${PORT}`);
});
