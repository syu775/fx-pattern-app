<script>
let patternMats = {}; // 登録済みパターン画像 (high1~low3)

function loadPatternImages() {
  const keys = ["high1", "high2", "high3", "low1", "low2", "low3"];
  keys.forEach(key => {
    const canvas = document.getElementById(key);
    if (canvas) {
      const mat = cv.imread(canvas);
      patternMats[key] = mat;
    }
  });
}

// iframeキャプチャ
async function captureIframesAndCompare() {
  const wrappers = document.querySelectorAll('.chart-wrapper');

  for (const wrapper of wrappers) {
    const canvasOut = await html2canvas(wrapper);

    // 比較対象画像としてOpenCVに渡す
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasOut.width;
    tempCanvas.height = canvasOut.height;
    tempCanvas.getContext('2d').drawImage(canvasOut, 0, 0);

    const capturedMat = cv.imread(tempCanvas);
    checkPatterns(capturedMat, wrapper.querySelector('h2').innerText);
    capturedMat.delete();
  }
}function compareImages(img1, img2) {
  const size = new cv.Size(180, 120);
  const resized1 = new cv.Mat();
  const resized2 = new cv.Mat();
  cv.resize(img1, resized1, size);
  cv.resize(img2, resized2, size);

  const gray1 = new cv.Mat();
  const gray2 = new cv.Mat();
  cv.cvtColor(resized1, gray1, cv.COLOR_RGBA2GRAY);
  cv.cvtColor(resized2, gray2, cv.COLOR_RGBA2GRAY);

  const orb = new cv.ORB();
  const kp1 = new cv.KeyPointVector();
  const kp2 = new cv.KeyPointVector();
  const desc1 = new cv.Mat();
  const desc2 = new cv.Mat();
  orb.detectAndCompute(gray1, new cv.Mat(), kp1, desc1);
  orb.detectAndCompute(gray2, new cv.Mat(), kp2, desc2);

  let similarity = 0;
  if (!desc1.empty() && !desc2.empty()) {
    const bf = new cv.BFMatcher(cv.NORM_HAMMING);
    const matches = new cv.DMatchVector();
    bf.match(desc1, desc2, matches);
    let totalDist = 0;
    for (let i = 0; i < matches.size(); i++) {
      totalDist += matches.get(i).distance;
    }
    const avgDist = totalDist / matches.size();
    similarity = Math.max(0, 100 - (avgDist / 2));
  }

  resized1.delete(); resized2.delete();
  gray1.delete(); gray2.delete();
  desc1.delete(); desc2.delete();
  kp1.delete(); kp2.delete();

  return similarity;
}

function checkPatterns(chartMat, currencyPair) {
  const threshold = 80;
  for (const [key, patternMat] of Object.entries(patternMats)) {
    if (!patternMat) continue;
    const similarity = compareImages(chartMat, patternMat);
    if (similarity >= threshold) {
      console.log(`[検出] ${currencyPair} - ${key} 類似度: ${similarity.toFixed(2)}%`);console.log(msg);
  sendSlackNotification(msg);
}
    }
  }
}function startMonitoring() {
  if (typeof cv === 'undefined') {
    console.error("OpenCV.js が未ロードです");
    return;
  }

  loadPatternImages(); // パターン画像を読み込み

  setInterval(() => {
    captureIframesAndCompare();
  }, 5000); // 5秒ごとに実行
}

// ページロード後にスタート
window.addEventListener('load', () => {
  startMonitoring();
});
function sendSlackNotification(message) {
  const webhookUrl = "https://hooks.slack.com/services/XXXXXXXX/XXXXXXXX/XXXXXXXXXXXXXXXX"; // 提督のSlack URLに差し替え

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: message })
  }).then(res => {
    if (!res.ok) {
      console.error("Slack通知に失敗しました");
    }
  }).catch(err => {
    console.error("Slack通知エラー:", err);
  });
}
