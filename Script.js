function extractVideoID(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^\\s&?/]+)/);
  return match ? match[1] : null;
}

function playYouTubeVideo() {
  const url = document.getElementById("ytLink").value;
  const videoId = extractVideoID(url);
  const playerContainer = document.getElementById("playerContainer");
  const thumbnail = document.getElementById("thumbnail");
  const nowPlaying = document.getElementById("nowPlaying");

  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&loop=1&playlist=${videoId}`;
    playerContainer.innerHTML =
      `<iframe width="0" height="0" src="${embedUrl}" frameborder="0"
        allow="autoplay" allowfullscreen></iframe>`;
    playerContainer.style.display = "block";

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    thumbnail.src = thumbnailUrl;
    thumbnail.style.display = "block";

    nowPlaying.textContent = "🎧 Now playing!";
  } else {
    nowPlaying.textContent = "❌ Invalid YouTube link!";
    thumbnail.style.display = "none";
    playerContainer.style.display = "none";
  }
}

document.getElementById("playBtn").addEventListener("click", playYouTubeVideo);

// 🎛️ Visualizer Animation
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
let bars = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 200;
}

function drawVisualizer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / bars;
  for (let i = 0; i < bars; i++) {
    const height = Math.random() * canvas.height * 0.8;
    const x = i * barWidth;
    const y = canvas.height - height;
    const hue = 30 + i * 4;
    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.fillRect(x, y, barWidth - 2, height);
  }
  requestAnimationFrame(drawVisualizer);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawVisualizer();
