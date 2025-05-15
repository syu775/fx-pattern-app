// FX Slack通知サーバー（2025-05-15 再デプロイ用更新）

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Slack Webhook URL
const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

// テスト通知エンドポイント
app.get('/notify', async (req, res) => {
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: '【通知テスト】Slack通知サーバーが正常に動作しています（再デプロイ確認済）'
    });
    res.send('通知送信成功！');
  } catch (error) {
    console.error('通知失敗:', error);
    res.status(500).send('通知送信に失敗しました');
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
