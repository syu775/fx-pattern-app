const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 通知テスト用ルート
app.get('/', (req, res) => {
  res.send('FX Notify Server is running!');
});

// 通知送信用ルート
app.get('/notify', (req, res) => {
  const text = req.query.text || 'Default Message';

  // ここでSlack WebhookやLINE Notifyなどに送信する処理を書く
  console.log(`通知テスト: ${text}`);
  res.send(`通知内容: ${text}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
