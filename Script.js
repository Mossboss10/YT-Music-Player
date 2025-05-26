const container = document.querySelector("#holder");
const form = document.querySelector("#idform");
const idInput = document.querySelector("#id_input");

function extractVideoID(input) {
  // Handles both raw video ID and full YouTube URL
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([^\s&?/]+)/;
  const match = input.match(regex);
  return match ? match[1] : input; // fallback to input if it looks like an ID
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = idInput.value.trim();
  const videoID = extractVideoID(inputVal);

  if (videoID) {
    container.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0"
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  } else {
    container.innerHTML = `<p style="color: red;">❌ Invalid YouTube link or ID</p>`;
  }
});
