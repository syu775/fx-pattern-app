// notify.js
const axios = require('axios');

const webhookUrl = 'https://hooks.slack.com/services/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';

axios.post(webhookUrl, {
  text: 'Slack通知テスト：Renderサーバーから送信成功しました。'
})
.then(() => {
  console.log('通知送信成功');
})
.catch((error) => {
  console.error('通知送信失敗', error);
});
