// chart-checker.js

async function sendNotification(message) {
  const webhookUrl = 'https://hooks.slack.com/services/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';

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    });
    console.log('通知送信成功:', message);
  } catch (error) {
    console.error('通知送信失敗:', error);
  }
}

// 通知テストを実行
sendNotification('Slack通知テスト');
