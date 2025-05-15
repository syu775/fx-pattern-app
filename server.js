const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Slack Webhook URL（環境変数から取得）
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

// ルート確認用
app.get('/', (req, res) => {
  res.send('FX Notify Server is running');
});

// Slack通知テスト用のエンドポイント
app.get('/notify', async (req, res) => {
  if (!webhookUrl) {
    return res.status(500).send('Slack Webhook URLが設定されていません');
  }

  try {
    await axios.post(webhookUrl, {
      text: '通知テスト：FXパターン検出BotからのSlack通知成功'
    });
    res.send('Slack通知に成功しました');
  } catch (error) {
    console.error('通知エラー:', error.message);
    res.status(500).send('Slack通知に失敗しました');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
