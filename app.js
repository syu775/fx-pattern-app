document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");

  // 画像パターン判定処理（仮）
  function checkChart() {
    const now = new Date().toLocaleTimeString();
    console.log(`[${now}] チャートを確認中...`);

    // デモ用メッセージ表示
    if (status) {
      status.textContent = `[${now}] チャート確認済み（仮）`;
    }

    // TODO: 本物のチャート取得と画像AI判定を組み込みます
  }

  // 5秒ごとにチャートを確認（リアルタイム監視）
  setInterval(checkChart, 5000);

  // 初回も即チェック
  checkChart();
});
