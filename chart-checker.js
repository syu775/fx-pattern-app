function sendSlackNotification(message) {
  // ローカルストレージからWebhook URLを取得
  const webhookUrl = localStorage.getItem('webhookUrl');
  if (!webhookUrl) {
    console.warn('Slack Webhook URLが未設定です');
    return;
  }

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
  })
  .then(res => {
    if (!res.ok) console.error('Slack通知に失敗:', res.statusText);
  })
  .catch(err => {
    console.error('Slack送信エラー:', err);
  });
}
