const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Webhook URL（直接記述）
const webhookUrl = 'https://hooks.slack.com/services/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';

app.get('/notify', async (req, res) => {
  try {
    const message = {
      text: '通知成功：FX Notify ServerからのSlack通知です'
    };

    const response = await axios.post(webhookUrl, message);

    if (response.status === 200) {
      res.status(200).send('Slack通知に成功しました');
    } else {
      res.status(response.status).send('Slack通知に失敗しました');
    }
  } catch (error) {
    console.error('Slack通知エラー:', error.message);
    res.status(500).send('Slack通知中にエラーが発生しました');
  }
});

app.get('/', (req, res) => {
  res.send('FX Notify Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
